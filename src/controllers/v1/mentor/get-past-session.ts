import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler';
import ApiError from '../../../utils/ApiError';
import ApiResponse from '../../../utils/ApiResponse';
import Session from '../../../models/sessions.model';

export const getPastSession = asyncHandler(async (req: Request, res: Response) => {
  const { mentorId } = req.params;

  if (!mentorId) {
    throw new ApiError(400, 'Mentor ID is required');
  }

  const pastSessions = await Session.find({
    mentorId,
    status: 'completed',
  });

  if (!pastSessions) {
    throw new ApiError(400, 'No past sessions found');
  }

  return res.status(200).json(new ApiResponse(200, pastSessions, 'Past sessions found'));
});
