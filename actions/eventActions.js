'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'
import { eventService } from '@/lib/services/eventService'
import { handleServerActionError } from '@/lib/utils/errorHandler'
import { generateEventRegistrationEmail, generateEventRegistrationEmailText } from '@/lib/emailTemplates/EventRegistrationTemplate'

/**
 * Add/Remove Interested Event Server Action
 * 
 * Toggles user interest in an event and revalidates the page.
 * Follows existing server action pattern.
 */
export async function addInterestedEvent(eventId, userId) {
  try {
    if (!eventId || !userId) {
      return {
        success: false,
        error: 'Event ID and User ID are required'
      };
    }

    // Update interest using service
    const updatedEvent = await eventService.updateInterest(eventId, userId);
    
    // Revalidate the page to show updated data
    revalidatePath('/');
    revalidatePath(`/details/${eventId}`);

    return {
      success: true,
      event: updatedEvent,
      message: 'Interest updated successfully'
    };
  } catch (error) {
    return handleServerActionError(error, { 
      action: 'updateInterest', 
      eventId,
      userId 
    });
  }
}

/**
 * Add Going Event Server Action
 * 
 * Registers user for event and sends confirmation email.
 * Follows existing server action pattern with redirect.
 */
export async function addGoingEvent(eventId, user) {
  try {
    if (!eventId || !user?.id) {
      return {
        success: false,
        error: 'Event ID and User are required'
      };
    }

    // Update going status using service
    await eventService.updateGoing(eventId, user.id);

    // Send confirmation email
    await sendEmail(eventId, user);
    
    // Revalidate the page to show updated data
    revalidatePath('/');
    revalidatePath(`/details/${eventId}`);
    
    // Return success response instead of redirect
    return {
      success: true,
      message: 'Event registration successful! Check your email for confirmation.'
    };
  } catch (error) {
    return handleServerActionError(error, { 
      action: 'addGoingEvent', 
      eventId,
      userId: user?.id 
    });
  }
}

/**
 * Send Email Helper Function
 * 
 * Sends event registration confirmation email using Resend
 */
async function sendEmail(eventId, user) {
  try {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key_here') {
      return;
    }

    if (!user?.email) {
      return;
    }

    // Get event details
    const event = await eventService.getEventById(eventId);
    
    if (!event) {
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Generate professional email templates (both HTML and text)
    const htmlContent = generateEventRegistrationEmail(user, event);
    const textContent = generateEventRegistrationEmailText(user, event);
    
    // For testing - send to verified email instead of user email
    const emailTo = 'md.soharubhossen@gmail.com'; // Always send to verified email for now
    
    const sent = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: emailTo, // Use verified email for testing
      subject: `🎉 Registration Confirmed - ${event?.name} (for ${user?.email})`, // Show actual user email in subject
      text: textContent,
      html: htmlContent
    });

  } catch (error) {
    // Silent error handling - could log to external service in production
  }
}
