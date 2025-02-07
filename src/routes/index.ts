import express from 'express';
import authRoute from './auth.route';
import studentRoute from './student.route';
import mentorRoute from './mentor.route';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/student', studentRoute);
router.use('/mentor', mentorRoute);

export default router;
