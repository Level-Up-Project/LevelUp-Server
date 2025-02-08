import express from 'express';
// import sessionBooking from '../controllers/v1/student/session-booking';
import authMiddleware from '../middlewares/auth.middleware';
import pastSession from '../controllers/v1/student/past-session';
import upcomingSessions from '../controllers/v1/student/upcoming-session';
import { profileSetup, getStudentProfile } from '../controllers/v1/student/profileSetup';
import { studentValidator } from '../validators/studentValidator';
import handleValidationErrors from '../middlewares/validationErrorHandlert';

const studentRoute = express.Router();

studentRoute.post('/profile-setup', studentValidator, handleValidationErrors, profileSetup);
studentRoute.get('/:studentCode', getStudentProfile);

studentRoute.get('/get-upcoming-sessions', authMiddleware, upcomingSessions);
studentRoute.get('/get-past-sessions', authMiddleware, pastSession);

export default studentRoute;
