import { Request, Response, NextFunction } from 'express';
import Course from '../../../models/course.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import asyncHandler from '../../../utils/AsyncHandler.js';

export const getCoursesByCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.query;

    if (!category) {
        return res.status(400).json(new ApiResponse(400, 'Category is required.'));
    }

    // Validate if the category is one of the allowed categories
    const allowedCategories = ['coding', 'dsa', 'csbt'];
    if (!allowedCategories.includes(category as string)) {
        return res
            .status(400)
            .json(new ApiResponse(400, `Invalid category. Allowed categories are: ${allowedCategories.join(', ')}`));
    }

    // Fetch courses by category
    const courses = await Course.find({ category });

    if (!courses || courses.length === 0) {
        return res.status(200).json(new ApiResponse(200, 'No courses found for the selected category.', []));
    }

    return res.status(200).json(new ApiResponse(200, 'Courses retrieved successfully.', courses));
});
