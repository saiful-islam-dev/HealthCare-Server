import { Request } from "express";
import prisma from "../../../Share/prisma";
import { fileUploader } from "../../../helper/fileUploader";

const inserIntoDB = async (req: Request) => {
  const file = req.file;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadTocloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

const getAllFromDB = async () => {
  console.log("object");
};

export const SpecialtiesService = {
  inserIntoDB,
  getAllFromDB,
  // deleteFromDB
};
