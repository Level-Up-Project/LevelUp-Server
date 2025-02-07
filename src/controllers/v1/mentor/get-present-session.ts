import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler';
import ApiError from '../../../utils/ApiError';
import ApiResponse from '../../../utils/ApiResponse';
import Session from '../../../models/sessions.model';

export const getPresentSession = asyncHandler(async (req: Request, res: Response) => {
  const { mentorId } = req.params;

  if (!mentorId) {
    throw new ApiError(400, 'Mentor ID is required');
  }

  const presentSessions = await Session.find({
    mentorId,
    status: 'approve',
    startTime: { $gte: new Date() },
  });

  if (!presentSessions) {
    throw new ApiError(400, 'No present sessions found');
  }

  return res.status(200).json(new ApiResponse(200, presentSessions, 'Present sessions found'));
});
