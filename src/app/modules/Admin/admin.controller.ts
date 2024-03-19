import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { adminFilterableFields } from './admin.constant';

const pick = <T extends Record<string, unknown>, k extends keyof T>(obj: T, keys: k[]): Partial<T> => {
    const finalObj: Partial<T> = {};

    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key]
        }
    }

    return finalObj;
}

const getAllFromDB = async (req: Request, res: Response) => {
    try {

        const filters = pick(req.query, adminFilterableFields);
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        console.log({options})
        const result = await AdminService.getAllFromDB(filters, options)
        res.status(200).json({
            success: true,
            message: "Admin data fetched!",
            data: result
        })
    }   
    catch (err) {
        res.status(500).json({
            success: false,
            message: err?.name || "Something went wrong",
            error: err
        })
    }
}

export const AdminController = {
    getAllFromDB
}