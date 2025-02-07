import express from 'express';
import authRoute from './auth.route';
import studentRoute from './student.route';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/student', studentRoute);

export default router;
