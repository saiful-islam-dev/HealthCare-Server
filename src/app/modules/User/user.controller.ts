import { Request, Response } from "express";
import { userServeice } from "./user.service";

const createAdmin = async (req: Request, res: Response) =>{
    const data = req.body;
    const result = await userServeice.createAdmin(data);

    return result;
};

export const userController = {
    createAdmin
}