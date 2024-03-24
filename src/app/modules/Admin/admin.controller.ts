import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AdminService } from './admin.service';
import { adminFilterableFields } from './admin.constant';
import pick from '../../../Share/pick';
import sendResponse from '../../../Share/sendResponse';
import httpStatus from "http-status";
import catchAsync from '../../../Share/catchAsync';


const getAllFromDB = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
)


const getByIdFromDB = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
        const result = await AdminService.getByIdFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data fetched by id!",
            data: result
        });
    })

const updateIntoDB = catchAsync(async(req: Request, res: Response,next: NextFunction) =>{
    const {id} = req.params;
  
        const result = await AdminService.updateIntoDB(id, req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data updated!",
            data: result
        })
    })

const deleteFromDB = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const {id} = req.params;
    
        const result = await AdminService.deleteFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data deleted!",
            data: result
        })
    })

const softDeleteFromDB = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const {id} = req.params;
    console.log(id);
        const result = await AdminService.softDeletFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data deleted!",
            data: result
        })
    } )


export const AdminController = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB
}