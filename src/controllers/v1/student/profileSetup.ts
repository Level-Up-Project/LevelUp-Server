import { Request, Response } from 'express';
import Student from '../../../models/student.model.js';
import ApiError from '../../../utils/ApiError.js';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiResponse from '../../../utils/ApiResponse.js';

// Create or Update Student Profile
const profileSetup = asyncHandler(async (req: Request, res: Response) => {
    const { userId, studentCode, currentCourses, skills } = req.body;

    const student = await Student.findById(userId);
    if (!student) {
        throw new ApiError(400, 'Student profile already exists.');
    }
    // If student exists, update the profile;
    const createStudent = await Student.create({
        _id: userId,
        currentCourses,
        skills,
        studentCode,
    });
    if (!createStudent) {
        throw new ApiError(400, 'Error Occured while creating student profile.');
    }
    res.status(200).json(new ApiResponse(200, 'Profile updated successfully.', student));
});
export default profileSetup;
