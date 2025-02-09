import { Request, Response, NextFunction } from 'express';
import Course from '../../../models/course.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import ApiError from '../../../utils/ApiError.js';
import asyncHandler from '../../../utils/AsyncHandler.js';

export const updateCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const { courseName, category } = req.body;

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
        return next(new ApiError(404, `Course with ID '${courseId}' not found.`));
    }

    // Update course fields
    if (courseName) course.courseName = courseName;
    if (category) course.category = category;

    // Save the updated course
    const updatedCourse = await course.save();

    return res.status(200).json(
        new ApiResponse(200, 'Course updated successfully.', {
            courseId: updatedCourse._id,
            courseName: updatedCourse.courseName,
            category: updatedCourse.category,
        })
    );
});
