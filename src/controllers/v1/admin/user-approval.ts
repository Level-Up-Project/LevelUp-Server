import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import User from '../../../models/user.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';

export const adminUserApproval = asyncHandler(async (req: Request, res: Response) => {
    const { userId, status, role } = req.body;

    if (!userId || !status || !role) {
        throw new ApiError(400, 'User ID and Status is required');
    }

    // Update the user status to approved
    const validRoles = ['user', 'student', 'mentor', 'admin', 'superAdmin'];
    if (!validRoles.includes(role)) {
        throw new ApiError(404, 'Invalid role specified');
    }

    const user = await User.findByIdAndUpdate(
        userId, 
        { $set: { status, role } }, 
        { new: true, runValidators: true }
    );

    if (!user) {
        throw new ApiError(400, 'User not found');
    }

    return res.status(200).json(new ApiResponse(200, 'User approval successful', user));
});
