import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
       const me = await schema.parseAsync({
            body: req.body
        })

        console.log(me);
        return next();
    }
    catch (err) {
        next(err)
    }
};

export default validateRequest;