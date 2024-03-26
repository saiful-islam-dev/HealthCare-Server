
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../Share/catchAsync";
import sendResponse from "../../../Share/sendResponse";
import { AuthServices } from "./auth.service";


const loginUser = catchAsync(async (req: Request, res: Response) => {
    console.log("C 10",req.body);
    const result = await AuthServices.loginUser(req.body);

    const {refreshToken } = result; 

    res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true
    })

    console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully!",
        data:{
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
   
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully!",
        data: result
        // data: {
        //     accessToken: result.accessToken,
        //     needPasswordChange: result.needPasswordChange
        // }
    })
});


const changePassword = catchAsync(async (req: Request & {user?: any}, res: Response) => {
    const user= req.user;

    const result = await AuthServices.changePassword(user, req.body);
   
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password Changed successfully!",
        data: result
    })
});


const forgotPassword = catchAsync(async(req:Request, res: Response)=>{
    await AuthServices.forgotPassword(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Check your email!",
        data: null
    })
})

const resetPassword = catchAsync(async(req:Request, res: Response)=>{

    const token = req.headers.authorization || "";

    await AuthServices.resetPassword(token, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Check your email!",
        data: null
    })
})

export const AuthController = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
};