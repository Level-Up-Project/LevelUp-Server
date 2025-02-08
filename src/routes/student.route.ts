import express from 'express';
// import sessionBooking from '../controllers/v1/student/session-booking';
import authMiddleware from  '../middlewares/auth.middleware';
import pastSession from '../controllers/v1/student/past-session';
import upcomingSessions from '../controllers/v1/student/upcoming-session';



const studentRoute = express.Router();


studentRoute.get('/get-upcoming-sessions', authMiddleware, upcomingSessions);
studentRoute.get('/get-past-sessions', authMiddleware, pastSession);

// studentRoute.post('/session-booking', authMiddleware, sessionBooking);
export default studentRoute;
