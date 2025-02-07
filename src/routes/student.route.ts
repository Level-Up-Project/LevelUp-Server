import express from 'express';
import { profileSetup, getStudentProfile } from '../controllers/v1/student/profileSetup';
import { studentValidator } from '../validators/studentValidator';
import handleValidationErrors from '../validators/validationErrorHandlert';

const studentRoute = express.Router();

studentRoute.post('/setup', studentValidator, handleValidationErrors, profileSetup);

studentRoute.get('/:studentCode', getStudentProfile);

export default studentRoute;
