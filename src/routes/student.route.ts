import express from 'express';
import { profileSetup, getStudentProfile } from '../controllers/v1/student/profileSetup';
import { studentValidator } from '../validators/studentValidator';
import { validateRequest } from '../middlewares/validateRequest';

const studentRoute = express.Router();

studentRoute.post('/setup', studentValidator, validateRequest, profileSetup);

studentRoute.get('/:studentCode', getStudentProfile);

export default studentRoute;
