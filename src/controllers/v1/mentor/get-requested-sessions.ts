import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler';
import ApiError from '../../../utils/ApiError';
import ApiResponse from '../../../utils/ApiResponse';
import Session from '../../../models/sessions.model';

export const getRequestedSessions = asyncHandler(async (req: Request, res: Response) => {
  const { mentorId } = req.params;

  if (!mentorId) {
    throw new ApiError(400, 'Mentor ID is required');
  }

  // Find all sessions where mentorId is equal to the current mentorId and session status is pending
  const requestedSessions = await Session.find({
    mentorId,
    status: 'pending',
  });

  if (!requestedSessions) {
    throw new ApiError(400, 'No sessions found');
  }

  return res.status(200).json(new ApiResponse(200, requestedSessions, 'Requested sessions found'));
});
