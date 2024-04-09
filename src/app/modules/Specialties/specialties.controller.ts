import httpStatus from "http-status";
import catchAsync from "../../../Share/catchAsync";
import sendResponse from "../../../Share/sendResponse";
import { Request, Response } from "express";
import { SpecialtiesService } from "./specialties.service";

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await SpecialtiesService.inserIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesService.getAllFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties data fetched successfully",
    data: result,
  });
});

export const SpecialtiesController = { getAllFromDB, inserIntoDB };
