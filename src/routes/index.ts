import express from 'express'
import userRouter from './auth.route';
const router=express.Router()


router.use('/user', userRouter)


export default router