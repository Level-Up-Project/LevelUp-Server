import { Request, Response, NextFunction } from 'express';
import Course from '../../../models/course.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import asyncHandler from '../../../utils/AsyncHandler.js';

export const getCourses = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Fetch all courses from the database
    const courses = await Course.find();

    if (!courses || courses.length === 0) {
        return res.status(200).json(new ApiResponse(200, 'No courses found.', []));
    }

    return res.status(200).json(new ApiResponse(200, 'Courses retrieved successfully.', courses));
});
