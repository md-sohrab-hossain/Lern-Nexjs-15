'use server'

import { revalidatePath } from 'next/cache'
import { eventService } from '@/lib/services/eventService'
import { handleServerActionError } from '@/lib/utils/errorHandler'

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
