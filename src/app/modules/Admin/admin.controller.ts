import { NextFunction, Request, Response } from 'express';
import { AdminService } from './admin.service';
import { adminFilterableFields } from './admin.constant';
import pick from '../../../Share/pick';
import sendResponse from '../../../Share/sendResponse';
import httpStatus from "http-status";

const getAllFromDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filters = pick(req.query, adminFilterableFields);
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
        
        const result = await AdminService.getAllFromDB(filters, options);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data fetched!",
            meta: result.meta,
            data: result.data
        })
    }   
    catch (err) {
        next(err)
    }
}


const getByIdFromDB = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    try {
        const result = await AdminService.getByIdFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data fetched by id!",
            data: result
        });
    }   
    catch (err) {
        next(err)
    }
}

const updateIntoDB = async(req: Request, res: Response,next: NextFunction) =>{
    const {id} = req.params;
    try {
        const result = await AdminService.updateIntoDB(id, req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data updated!",
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const deleteFromDB = async(req: Request, res: Response, next: NextFunction) =>{
    const {id} = req.params;
    console.log(id);
    try {
        const result = await AdminService.deleteFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data deleted!",
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const softDeletFromDB = async(req: Request, res: Response, next: NextFunction) =>{
    const {id} = req.params;
    console.log(id);
    try {
        const result = await AdminService.softDeletFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data deleted!",
            data: result
        })
    } catch (err) {
        next(err)
    }
}


export const AdminController = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeletFromDB
}