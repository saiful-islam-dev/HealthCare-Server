
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../Share/catchAsync";
import sendResponse from "../../../Share/sendResponse";
import { AuthServices } from "./auth.service";


const loginUser = catchAsync(async (req: Request, res: Response) => {
    console.log("C 10",req.body);
    const result = await AuthServices.loginUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully!",
        data: null
    })
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies;
    const result = await AuthServices.refreshToken(token);
   
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully!",
        data: null
        // data: {
        //     accessToken: result.accessToken,
        //     needPasswordChange: result.needPasswordChange
        // }
    })
});

export const AuthController = {
    loginUser,
    refreshToken
};