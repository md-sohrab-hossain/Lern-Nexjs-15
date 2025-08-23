import { NextResponse } from 'next/server';
import { userService } from '@/lib/services/userService';
import { validateLoginData, sanitizeUserInput, checkRateLimit } from '@/lib/validation/authValidation';
import { handleAPIError, formatErrorResponse, createAuthError, createRateLimitError } from '@/lib/utils/errorHandler';

/**
 * POST /api/auth/login - User login API
 * 
 * Secure login API using service layer and proper validation.
 * Includes rate limiting and comprehensive error handling.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const email = sanitizeUserInput(body.email);
    const password = body.password; // Don't sanitize password

    // Rate limiting check
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitResult = checkRateLimit(`api-login:${email}:${clientIP}`, 5, 15 * 60 * 1000);
    if (rateLimitResult.blocked) {
      throw createRateLimitError(rateLimitResult.message);
    }

    // Input validation
    const validation = validateLoginData(email, password);
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

    // Authenticate user using service
    const user = await userService.authenticateUser(email, password);
    
    if (!user) {
      throw createAuthError('Email or password is incorrect');
    }

    // TODO: Generate JWT token here
    // const token = await generateJWTToken(user);
    
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        // token, // Include when JWT is implemented
      }
    });
  } catch (error) {
    return handleAPIError(error, { 
      endpoint: '/api/auth/login', 
      method: 'POST',
      email: body?.email 
    });
  }
}

/**
 * GET /api/auth/login - Method not allowed
 */
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}
