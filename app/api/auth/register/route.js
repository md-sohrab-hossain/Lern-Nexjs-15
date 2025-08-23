import { NextResponse } from 'next/server';
import { userService } from '@/lib/services/userService';
import { validateRegistrationData, sanitizeUserData, checkRateLimit } from '@/lib/validation/authValidation';
import { handleAPIError, formatErrorResponse, createRateLimitError, createValidationError } from '@/lib/utils/errorHandler';

/**
 * POST /api/auth/register - User registration API
 * 
 * Secure registration API using service layer and comprehensive validation.
 * Includes rate limiting and proper error handling.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const userData = sanitizeUserData(body);

    // Rate limiting check for registration attempts
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitResult = checkRateLimit(`api-register:${userData.email}:${clientIP}`, 3, 30 * 60 * 1000);
    if (rateLimitResult.blocked) {
      throw createRateLimitError(rateLimitResult.message);
    }

    // Input validation
    const validation = validateRegistrationData(userData);
    if (!validation.isValid) {
      return NextResponse.json(
        formatErrorResponse({
          name: 'ValidationError',
          message: validation.getFirstError(),
          statusCode: 400
        }),
        { status: 400 }
      );
    }

    // Create user using service
    const newUser = await userService.createUser(userData);

    // TODO: Send welcome email
    // await sendWelcomeEmail(newUser.email, newUser.name);

    return NextResponse.json({
      success: true,
      message: 'Registration successful!',
      data: {
        user: newUser
      }
    }, { status: 201 });
  } catch (error) {
    return handleAPIError(error, { 
      endpoint: '/api/auth/register', 
      method: 'POST',
      email: body?.email 
    });
  }
}

/**
 * GET /api/auth/register - Method not allowed
 */
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}
