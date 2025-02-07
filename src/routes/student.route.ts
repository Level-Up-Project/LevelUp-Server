import express from 'express';
import { profileSetup, getStudentProfile } from '../controllers/v1/student/profileSetup';
import { studentValidator } from '../validators/studentValidator';
import handleValidationErrors from '../middlewares/validationErrorHandlert';

const studentRoute = express.Router();

studentRoute.post('/profile-setup', studentValidator, handleValidationErrors, profileSetup);
studentRoute.get('/:studentCode', getStudentProfile);

export default studentRoute;
