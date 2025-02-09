import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import Mentor from '../../../models/mentor.model.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const { mentorId, currentCourses, skills } = req.body;

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
        throw new ApiError(400, 'Mentor not found');
    }

    if (currentCourses.length < 1 || skills.length < 1) {
        throw new ApiError(400, 'Please provide at least one course and skill');
    }

    // If mentor exists, update the profile
    mentor.currentCoursesAssigned = currentCourses;
    mentor.skills = skills;
    await mentor.save({ validateBeforeSave: false });

    res.status(200).json(new ApiResponse(200, 'Mentor profile updated successfully', mentor));
});
