import express from 'express';
import pastSession from '../controllers/v1/student/past-session.js';
import upcomingSessions from '../controllers/v1/student/upcoming-session.js';
import profileSetup from '../controllers/v1/student/profileSetup.js';
import getStudentProfile from '../controllers/v1/student/getStudentProfile.js';
import handleValidationErrors from '../middlewares/validationErrorHandlert.js';
import profileSetupValidator from '../validators/student/profile-setup.validator.js';
import bookSessionValidator from '../validators/student/bookSession.validator.js';
import BookSession from '../controllers/v1/student/BookSession.js';

const studentRoute = express.Router();

studentRoute.post('/profile-setup', profileSetupValidator, handleValidationErrors, profileSetup);
studentRoute.post('/book-session', bookSessionValidator, handleValidationErrors, BookSession);
studentRoute.get('/:studentCode', getStudentProfile);
studentRoute.get('/get-upcoming-sessions', upcomingSessions);
studentRoute.get('/get-past-sessions', pastSession);
export default studentRoute;
