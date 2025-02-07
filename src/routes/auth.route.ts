import express from 'express';
import register from '../controllers/v1/auth/register';
import login from '../controllers/v1/auth/login';
import registrationValidation from '../validators/registration.validator';
import loginValidation from '../validators/login.validator';
import handleValidationErrors from '../validators/validationErrorHandlert';
import authMiddleware from '../middlewares/auth.middleware';
import logout from '../controllers/v1/auth/logout';
import refreshAccessToken from '../controllers/v1/auth/refreshAccesstoken';
import resetPassword from '../controllers/v1/auth/reset-password';
import forgetPassword from '../controllers/v1/auth/forget-password';

const authRoute = express.Router();

authRoute.post('/register', registrationValidation, handleValidationErrors, register);
authRoute.post('/login', loginValidation, handleValidationErrors, login);
authRoute.get('/logout', authMiddleware, logout);
authRoute.get('/refreshAccessToken', refreshAccessToken);
authRoute.post('/forget-password', forgetPassword);
authRoute.post('/reset-password/:token', resetPassword);

export default authRoute;
