import { NextResponse } from 'next/server';
import { userService } from '@/lib/services/userService';
import { validateRegistrationData, sanitizeUserData } from '@/lib/validation/authValidation';
import { handleAPIError, formatErrorResponse } from '@/lib/utils/errorHandler';

/**
 * GET /api/users - Get all users (Admin only)
 * 
 * List users using service layer.
 * Includes pagination and proper error handling.
 */
export async function GET(request) {
  try {
    // TODO: Add authentication and authorization check
    // const user = await getCurrentUser(request);
    // if (!user || !user.isAdmin) {
    //   throw new AuthorizationError('Admin access required');
    // }

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    // Get users using service
    const result = await userService.getAllUsers({ page, limit });

    return NextResponse.json({
      success: true,
      data: result.users,
      pagination: result.pagination
    });
  } catch (error) {
    return handleAPIError(error, { endpoint: '/api/users', method: 'GET' });
  }
}

/**
 * POST /api/users - Create a new user
 * 
 * User creation using service layer.
 * Includes proper validation and error handling.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const sanitizedData = sanitizeUserData(body);

    // Validate input data
    const validation = validateRegistrationData(sanitizedData);
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
    const user = await userService.createUser(sanitizedData);

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User created successfully'
    }, { status: 201 });
  } catch (error) {
    return handleAPIError(error, { 
      endpoint: '/api/users', 
      method: 'POST',
      body: request.body
    });
  }
}

