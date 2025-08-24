/**
 * Event Registration Email Template
 * 
 * Professional HTML email template for event registration confirmation
 */

export const generateEventRegistrationEmailText = (user, event) => {
  return `
🎉 REGISTRATION CONFIRMED!

Hello ${user?.name || 'Valued Participant'}!

Congratulations! You have been successfully registered for ${event?.name || 'the event'}.
We're thrilled to have you join us for this exciting experience.

✅ REGISTRATION STATUS: CONFIRMED

EVENT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Event: ${event?.name || 'Event Name'}
📍 Location: ${event?.location || 'Event Location'}
👤 Registered Name: ${user?.name || 'Your Name'}
📧 Email: ${user?.email || 'your@email.com'}
🎫 Status: Confirmed

IMPORTANT INSTRUCTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Please carry this email confirmation and your official ID to the venue.
⏰ Arrive at least 15 minutes before the event starts for smooth check-in.

We're excited to see you at the event! If you have any questions or need to make 
changes to your registration, please contact our support team.

Thank you!
Best regards,
The Eventry Team

Please keep this email for your records.
  `;
};

export const generateEventRegistrationEmail = (user, event) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Registration Confirmation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 300;
        }
        
        .header .emoji {
            font-size: 40px;
            margin-bottom: 10px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #2c3e50;
        }
        
        .message {
            font-size: 16px;
            margin-bottom: 30px;
            line-height: 1.8;
            color: #555;
        }
        
        .event-details {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 25px;
            margin: 30px 0;
            border-radius: 5px;
        }
        
        .event-details h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 18px;
        }
        
        .detail-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 15px;
        }
        
        .detail-item .icon {
            width: 20px;
            margin-right: 12px;
            font-size: 16px;
        }
        
        .status-badge {
            background-color: #28a745;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            display: inline-block;
            margin: 20px 0;
        }
        
        .important-note {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 20px;
            border-radius: 5px;
            margin: 25px 0;
        }
        
        .important-note h4 {
            color: #856404;
            margin-bottom: 10px;
        }
        
        .important-note p {
            color: #856404;
            margin: 0;
            font-size: 14px;
        }
        
        .footer {
            background-color: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .footer h3 {
            margin-bottom: 10px;
            font-size: 20px;
        }
        
        .footer p {
            margin-bottom: 5px;
            opacity: 0.8;
        }
        
        .footer .company {
            font-weight: 600;
            color: #667eea;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 5px;
            }
            
            .header, .content, .footer {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="emoji">🎉</div>
            <h1>Registration Confirmed!</h1>
            <p>You're all set for an amazing experience</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <div class="greeting">
                Hello <strong>${user?.name || 'Valued Participant'}</strong>!
            </div>
            
            <div class="message">
                Congratulations! You have been successfully registered for <strong>${event?.name || 'the event'}</strong>. 
                We're thrilled to have you join us for this exciting experience.
            </div>
            
            <div class="status-badge">
                ✅ Registration Confirmed
            </div>
            
            <!-- Event Details -->
            <div class="event-details">
                <h3>Event Details</h3>
                
                <div class="detail-item">
                    <span class="icon">🎯</span>
                    <span><strong>Event:</strong> ${event?.name || 'Event Name'}</span>
                </div>
                
                <div class="detail-item">
                    <span class="icon">📍</span>
                    <span><strong>Location:</strong> ${event?.location || 'Event Location'}</span>
                </div>
                
                <div class="detail-item">
                    <span class="icon">👤</span>
                    <span><strong>Registered Name:</strong> ${user?.name || 'Your Name'}</span>
                </div>
                
                <div class="detail-item">
                    <span class="icon">📧</span>
                    <span><strong>Email:</strong> ${user?.email || 'your@email.com'}</span>
                </div>
                
                <div class="detail-item">
                    <span class="icon">🎫</span>
                    <span><strong>Status:</strong> <span style="color: #28a745; font-weight: 600;">Confirmed</span></span>
                </div>
            </div>
            
            <!-- Important Note -->
            <div class="important-note">
                <h4>📋 Important Instructions</h4>
                <p>
                    Please carry this email confirmation and your official ID to the venue. 
                    Arrive at least 15 minutes before the event starts for a smooth check-in process.
                </p>
            </div>
            
            <div class="message">
                We're excited to see you at the event! If you have any questions or need to make changes 
                to your registration, please don't hesitate to contact our support team.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <h3>Thank You!</h3>
            <p>Best regards,</p>
            <p class="company">The Eventry Team</p>
            <p style="font-size: 12px; margin-top: 15px; opacity: 0.6;">
                Please keep this email for your records
            </p>
        </div>
    </div>
</body>
</html>
  `;
};

export default generateEventRegistrationEmail;
