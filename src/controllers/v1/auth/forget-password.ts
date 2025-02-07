import { Document } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../../utils/AsyncHandler';
import ApiError from '../../../utils/ApiError';
import ApiResponse from '../../../utils/ApiResponse';
import User, {UserInterface} from '../../../models/user.model';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import resetPasswordTemplate from '../../../templates/resetPassWordTemplate';
import sendEmail from '../../../services/sendEmail';


// get the email of user 
// generate a token
// send reset link to user email


const forgetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    if(!email) { 
        throw new ApiError(401,"Email is required");
    }
    const user  = await User.findOne({ email })
    if(!user) {
        throw new ApiError(401,"User not found with this email");
    }   
     const resetToken=  jwt.sign({id:user._id},process.env.JWT_RESET_PASSWORD_SECRET as string, { expiresIn: parseInt(process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES as string) });
     let url = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
     const htmlContent=resetPasswordTemplate(url);
     try {
        await sendEmail(email, "Reset Password", htmlContent);
     } catch (error) {
        console.log('error occured while sending email',error);
     }
     
     res.status(200).json(new ApiResponse(200,{},"Reset link has been sent to your email"));
})


export default forgetPassword;