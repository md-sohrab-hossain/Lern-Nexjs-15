'use server'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

// Get user profile
export async function getUserProfile(userId) {
  if (!userId) {
    throw new Error('User ID is required')
  }

  try {
    await dbConnect()
    
    const user = await User.findById(userId).select('-password').lean()
    
    if (!user) {
      throw new Error('User not found')
    }

    return {
      ...user,
      _id: user._id.toString()
    }
  } catch (error) {
    console.error('Get user profile error:', error)
    throw new Error('Failed to fetch user profile')
  }
}

// Update user profile
export async function updateUserProfile(userId, profileData) {
  if (!userId) {
    throw new Error('User ID is required')
  }

  if (!profileData) {
    throw new Error('Profile data is required')
  }

  try {
    await dbConnect()
    
    // Remove password from update data if present
    const { password, ...updateData } = profileData

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password').lean()

    if (!updatedUser) {
      throw new Error('User not found')
    }

    return {
      ...updatedUser,
      _id: updatedUser._id.toString()
    }
  } catch (error) {
    console.error('Update user profile error:', error)
    throw new Error(error.message || 'Failed to update user profile')
  }
}

// Change password
export async function changePassword(userId, currentPassword, newPassword) {
  if (!userId || !currentPassword || !newPassword) {
    throw new Error('User ID, current password, and new password are required')
  }

  if (newPassword.length < 6) {
    throw new Error('New password must be at least 6 characters long')
  }

  try {
    await dbConnect()
    
    const user = await User.findById(userId)
    
    if (!user) {
      throw new Error('User not found')
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect')
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword })

    return { success: true, message: 'Password changed successfully' }
  } catch (error) {
    console.error('Change password error:', error)
    throw new Error(error.message || 'Failed to change password')
  }
}

// Delete user account
export async function deleteUserAccount(userId, password) {
  if (!userId || !password) {
    throw new Error('User ID and password are required')
  }

  try {
    await dbConnect()
    
    const user = await User.findById(userId)
    
    if (!user) {
      throw new Error('User not found')
    }

    // Verify password before deletion
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      throw new Error('Password is incorrect')
    }

    // Delete user
    await User.findByIdAndDelete(userId)

    return { success: true, message: 'Account deleted successfully' }
  } catch (error) {
    console.error('Delete user account error:', error)
    throw new Error(error.message || 'Failed to delete account')
  }
}

