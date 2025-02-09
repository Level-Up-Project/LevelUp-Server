import { Request, Response, NextFunction } from 'express';
import Course from '../../../models/course.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import ApiError from '../../../utils/ApiError.js';
import asyncHandler from '../../../utils/AsyncHandler.js';

export const createCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { courseName, category } = req.body;

    // Checks if the course already exists
    const existingCourse = await Course.findOne({ courseName });
    if (existingCourse) {
        return next(new ApiError(400, `Course with name '${courseName}' already exists.`));
    }

    // Create a new course
    const course = await Course.create({ courseName, category });

    return res.status(201).json(
        new ApiResponse(201, 'Course created successfully.', {
            courseId: course._id,
            courseName: course.courseName,
            category: course.category,
        })
    );
});
