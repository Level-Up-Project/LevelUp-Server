import express from 'express';
import { profileSetup } from '../controllers/v1/mentor/profile-setup';
import profileSetupValidation from '../validators/mentor/profile-setup.validator';
import handleValidationErrors from '../validators/validationErrorHandlert';
import { sessionApprove } from '../controllers/v1/mentor/session-approve';
import { getPastSession } from '../controllers/v1/mentor/get-past-session';
import { getSessions } from '../controllers/v1/mentor/get-sessions';

const mentorRoute = express.Router();

mentorRoute.post('/profile-setup', profileSetupValidation, handleValidationErrors, profileSetup);
mentorRoute.get('/get-sessions/:mentorId', getSessions);
mentorRoute.put('/session-approve', sessionApprove);
mentorRoute.get('/get-past-session/:mentorId', getPastSession);

export default mentorRoute;
