import User from '@/models/User';
import dbConnect from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { replaceMongoIdInObject } from '@/utils/data-util';

/**
 * User Service Class
 * 
 * Service layer for database operations.
 * Use this service instead of direct DB calls from actions.
 */
class UserService {
  /**
   * Find user by email
   */
  async findUserByEmail(email) {
    try {
      await dbConnect();
      const user = await User.findOne({ email }).lean();
      return user ? replaceMongoIdInObject(user) : null;
    } catch (error) {
      console.error('Error in userService.findUserByEmail:', error);
      throw new Error('Database query failed');
    }
  }

  /**
   * Find user by ID
   */
  async findUserById(userId) {
    try {
      await dbConnect();
      const user = await User.findById(userId).lean();
      return user ? replaceMongoIdInObject(user) : null;
    } catch (error) {
      console.error('Error in userService.findUserById:', error);
      throw new Error('Database query failed');
    }
  }

  /**
   * Create new user
   */
  async createUser(userData) {
    try {
      await dbConnect();
      
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      // Create user
      const newUser = await User.create({
        ...userData,
        password: hashedPassword
      });

      // Return user without password
      const { password: _, ...userWithoutPassword } = newUser.toObject();
      return replaceMongoIdInObject(userWithoutPassword);
    } catch (error) {
      console.error('Error in userService.createUser:', error);
      
      // Handle MongoDB duplicate key error
      if (error.code === 11000) {
        throw new Error('User with this email already exists');
      }
      
      // Handle Mongoose validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        throw new Error(validationErrors[0] || 'Invalid user data');
      }
      
      // Re-throw user-friendly errors
      if (error.message.includes('email') || error.message.includes('Email')) {
        throw error;
      }
      
      throw new Error('User registration failed');
    }
  }

  /**
   * Verify password
   */
  async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error('Error in userService.verifyPassword:', error);
      return false;
    }
  }

  /**
   * Authenticate user
   */
  async authenticateUser(email, password) {
    try {
      const user = await this.findUserByEmail(email);
      
      if (!user) {
        return null; // User not found
      }

      // Verify password
      const isPasswordValid = await this.verifyPassword(password, user.password);
      
      if (!isPasswordValid) {
        return null; // Invalid password
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error in userService.authenticateUser:', error);
      throw new Error('Authentication failed');
    }
  }

  /**
   * Update user profile
   */
  async updateUser(userId, updateData) {
    try {
      await dbConnect();
      
      // Remove password from update data if present
      const { password, ...safeUpdateData } = updateData;
      
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        safeUpdateData,
        { new: true, runValidators: true }
      ).lean();

      if (!updatedUser) {
        throw new Error('User not found');
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = updatedUser;
      return replaceMongoIdInObject(userWithoutPassword);
    } catch (error) {
      console.error('Error in userService.updateUser:', error);
      throw new Error('User update failed');
    }
  }

  /**
   * Change user password
   */
  async changePassword(userId, currentPassword, newPassword) {
    try {
      await dbConnect();
      
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isCurrentPasswordValid = await this.verifyPassword(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        throw new Error('Current password is incorrect');
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      
      // Update password
      await User.findByIdAndUpdate(userId, { password: hashedNewPassword });
      
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      console.error('Error in userService.changePassword:', error);
      if (error.message.includes('পাসওয়ার্ড')) {
        throw error; // Re-throw user-friendly errors
      }
      throw new Error('Password change failed');
    }
  }

  /**
   * Get all users (admin only)
   */
  async getAllUsers(options = {}) {
    try {
      await dbConnect();
      
      const { page = 1, limit = 10, select = '-password' } = options;
      const skip = (page - 1) * limit;
      
      const users = await User.find({})
        .select(select)
        .skip(skip)
        .limit(limit)
        .lean();
      
      const total = await User.countDocuments({});
      
      return {
        users: users.map(user => replaceMongoIdInObject(user)),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error in userService.getAllUsers:', error);
      throw new Error('Failed to fetch users');
    }
  }
}

// Singleton instance export
export const userService = new UserService();
export default userService;
