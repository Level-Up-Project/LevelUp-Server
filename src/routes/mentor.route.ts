import express from 'express';
import { profileSetup } from '../controllers/v1/mentor/profile-setup';
import profileSetupValidation from '../validators/mentor/profile-setup.validator';
import handleValidationErrors from '../validators/validationErrorHandlert';
import { getRequestedSessions } from '../controllers/v1/mentor/get-requested-sessions';
import { sessionApprove } from '../controllers/v1/mentor/session-approve';
import { getPastSession } from '../controllers/v1/mentor/get-past-session';
import { getPresentSession } from '../controllers/v1/mentor/get-present-session';

const mentorRoute = express.Router();

mentorRoute.post('/profile-setup', profileSetupValidation, handleValidationErrors, profileSetup);
mentorRoute.get('/get-requested-sessions/:mentorId', getRequestedSessions);
mentorRoute.put('/session-approve', sessionApprove);
mentorRoute.get('/get-past-session/:mentorId', getPastSession);
mentorRoute.get('/get-present-session/:mentorId', getPresentSession);

export default mentorRoute;
