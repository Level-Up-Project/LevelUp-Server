import express from 'express'
import register from '../controllers/v1/auth/register'
import login from '../controllers/v1/auth/login'
import registrationValidation from '../validators/registration-validators'
import loginValidation from '../validators/loginValidator'
import handleValidationErrors from '../validators/validationErrorHandlert'
import authMiddleware from '../middlewares/auth.middleware'
import logout from '../controllers/v1/auth/logout'
import refreshAccessToken from '../controllers/v1/auth/refreshAccesstoken'
import resetPassword from '../controllers/v1/auth/reset-password'
import forgetPassword from '../controllers/v1/auth/forget-password'


const router=express.Router()


router.post('/register',registrationValidation, handleValidationErrors, register)
router.post('/login',loginValidation, handleValidationErrors, login);
router.get('/logout', authMiddleware, logout);
router.get('/refreshAccessToken', refreshAccessToken);
router.post('/forget-password', forgetPassword);
router.post('/reset-password/:token', resetPassword);

export default router