import { Request, Response, NextFunction } from 'express';
import Course from '../../../models/course.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import ApiError from '../../../utils/ApiError.js';
import asyncHandler from '../../../utils/AsyncHandler.js';

export const deleteCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;

    // Validate the course ID
    if (!courseId) {
        return next(new ApiError(400, 'Course ID is required.'));
    }

    // Find and delete the course by ID
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    // If course not found, return a 404 error
    if (!deletedCourse) {
        return next(new ApiError(404, `Course with ID '${courseId}' not found.`));
    }

    // Return success response
    return res.status(200).json(
        new ApiResponse(200, 'Course deleted successfully.', {
            courseId: deletedCourse._id,
            courseName: deletedCourse.courseName,
        })
    );
});
