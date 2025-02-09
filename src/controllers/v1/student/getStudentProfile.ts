import { Request, Response } from 'express';
import Student from '../../../models/student.model.js';
import ApiError from '../../../utils/ApiError.js';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiResponse from '../../../utils/ApiResponse.js';

const getStudentProfile = asyncHandler(async (req: Request, res: Response) => {
    const { studentCode } = req.params;

    const student = await Student.findOne({ studentCode }).populate('enrolledCourses currentCourses bookedSessions');

    if (!student) {
        throw new ApiError(404, 'Student not found.');
    }

    res.status(200).json(new ApiResponse(200, 'Student profile retrieved successfully.', student));
});

export default getStudentProfile;
