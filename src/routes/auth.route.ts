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
import switchRole from '../controllers/v1/auth/switch-role';
import { createZoomMeeting, getMeetingDetails } from '../services/meeting';
import logger from '../config/logger';
const authRoute = express.Router();

authRoute.post('/register', registrationValidation, handleValidationErrors, register);
authRoute.post('/login', loginValidation, handleValidationErrors, login);
authRoute.get('/logout', authMiddleware(["user"]), logout);
authRoute.get('/refreshAccessToken', refreshAccessToken);
authRoute.post('/forget-password', forgetPassword);
authRoute.post('/reset-password/:token', resetPassword);
authRoute.post('/switch-role', authMiddleware(["user"]), switchRole);

authRoute.get('/meeting-details/:id', async (req, res) => {
    try {
        const id=Number(req.params.id)
        logger.info(`Meeting ID: ${id}`);
        const response = await getMeetingDetails(id);
        res.status(200).json({response});
    } catch (error) {
        res.status(500).json({error});
    }
    
})

authRoute.post('/create-meeting', async (req, res, next) => {
    try {
        const {title, type, startTime, duration, description} = req.body;
        const meetingDetails = {
            title,
            type,
            startTime,
            duration,
            description
        }
        const response = await createZoomMeeting(meetingDetails);
        res.status(200).json({response});

    } catch (error) {
        res.status(500).json({error})
    }
 });



export default authRoute;


/*

{
    "error": {
        "message": "Request failed with status code 400",
        "name": "AxiosError",
        "stack": "AxiosError: Request failed with status code 400\n    at settle (file:///C:/Users/RAHUL%20PRATAP%20SINGH/Desktop/Masai/masai-local/LevelUp-Server/node_modules/axios/lib/core/settle.js:19:12)\n    at IncomingMessage.handleStreamEnd (file:///C:/Users/RAHUL%20PRATAP%20SINGH/Desktop/Masai/masai-local/LevelUp-Server/node_modules/axios/lib/adapters/http.js:599:11)\n    at IncomingMessage.emit (node:events:531:35)\n    at endReadableNT (node:internal/streams/readable:1696:12)\n    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)\n    at Axios.request (file:///C:/Users/RAHUL%20PRATAP%20SINGH/Desktop/Masai/masai-local/LevelUp-Server/node_modules/axios/lib/core/Axios.js:45:41)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at getMeetingDetails (C:\\Users\\RAHUL PRATAP SINGH\\Desktop\\Masai\\masai-local\\LevelUp-Server\\src\\services\\meeting.ts:188:22)\n    at <anonymous> (C:\\Users\\RAHUL PRATAP SINGH\\Desktop\\Masai\\masai-local\\LevelUp-Server\\src\\routes\\auth.route.ts:26:26)",
        "config": {
            "transitional": {
                "silentJSONParsing": true,
                "forcedJSONParsing": true,
                "clarifyTimeoutError": false
            },
            "adapter": [
                "xhr",
                "http",
                "fetch"
            ],
            "transformRequest": [
                null
            ],
            "transformResponse": [
                null
            ],
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "maxBodyLength": -1,
            "env": {},
            "headers": {
                "Accept": "application/json, text/plain, ",
                "Authorization": "Bearer eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjQxOTcyOGUyLTIzZDQtNDZkNi1hNDNlLWEzM2Q3MjBlN2M3OCJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJRa3R5a1NjNlNaU1VyXzZtZ0xzdll3IiwidmVyIjoxMCwiYXVpZCI6ImJmMTc0MzllYmQ5ZWIzNWYzNTk5YTYyODc2YWJjMTE0ZWRlNTE0ZmViZjU0MTU2OTkxZmEwZGIwZjhjMGFlMzAiLCJuYmYiOjE3Mzg5NDcxNjQsImNvZGUiOiJRSW1Hd21zWVMwSzI5ZVRPZWV0SEVRSXF1WDlNYkxxdkwiLCJpc3MiOiJ6bTpjaWQ6Y2FLQkxydVFRZXQ5VXprVUEwTHJ3IiwiZ25vIjowLCJleHAiOjE3Mzg5NTA3NjQsInR5cGUiOjMsImlhdCI6MTczODk0NzE2NCwiYWlkIjoiMGljQkxuRGRTUG1RZE1md0txN2paQSJ9.-B_YC-yEjBZPoCAH-QTJ3kxyF0w_xIewfJ9CQbvQRaSthxxR16qjWhgXFXkk4UMZfJSMgus1MC7mRWMZBVkIUw",
                "User-Agent": "axios/1.7.9",
                "Accept-Encoding": "gzip, compress, deflate, br"
            },
            "method": "get",
            "url": "https://api.zoom.us/v2/report/meetings/87042819023/participants"
        },
        "code": "ERR_BAD_REQUEST",
        "status": 400
    }
}

*/