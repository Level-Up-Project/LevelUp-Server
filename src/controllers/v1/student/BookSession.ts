import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import Session from '../../../models/sessions.model.js';
import User from '../../../models/user.model.js';

const BookSession = asyncHandler(async (req: Request, res: Response) => {
    //    studentId, mentorId, courseId, title, description, joinee's emails[], startTime, endTime
    const { userId, mentorId, courseId, title, description, joinees, startTime, endTime } = req.body;

    // const users = await User.find({ email: { $in: emails } }).lean();

    // const userMap = users.reduce((acc, user) => {
    //     acc[user.email] = user._id;
    //     return acc;
    // }, {});

    let joineeArr = [];
    if (joinees.length > 0) {
        joineeArr = joinees.map(async (joineeEmail: any) => {
            const user = await User.findOne({ email: joineeEmail });
            if (!user) {
                throw new ApiError(404, `User not Found with this Email ${joineeEmail}`);
            }
            return user._id;
        });
    }
    joineeArr.push(userId);
    const sessionMembers = {
        host: mentorId,
        joinee: joineeArr,
    };
    const session = await Session.create({
        courseId,
        title,
        description,
        startTime,
        endTime,
        sessionMembers,
    });

    if (!session) {
        throw new ApiError(500, 'Error Occured While Creating Session in Database');
    }

    return res.status(200).json(new ApiResponse(200, 'Session Created SuccessFully'));
});

export default BookSession;
