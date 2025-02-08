import { Request, Response, NextFunction } from 'express';
import User from '../../../models/user.model'
import asyncHandler from '../../../utils/AsyncHandler';
import ApiError from '../../../utils/ApiError';
import  ApiResponse  from '../../../utils/ApiResponse';

interface RegisterRequest extends Request {
    body: {
        email: string;
        [key: string]: any;
    };
}

function isAlreadyRegistered(email: string): Promise<boolean> {
    return User.findOne({ email }).then(user => !!user);
}

const register = asyncHandler(async (req: RegisterRequest, res: Response, next: NextFunction) => {
    if (await isAlreadyRegistered(req.body.email)) {
        throw new ApiError(400, "User already registered");
    }
    let user = await User.create(req.body);
    if(!user) {
        throw new ApiError(500, "Error occured while registering user.")
    }

    return res.status(200).json(new ApiResponse(200, {}, "Successfully Registered"));
});

export default register;