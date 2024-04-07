import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { fileUploader } from "../../../helper/fileUploader";
import { IFile } from "../../interface/file";

const prisma = new PrismaClient();

const createAdmin = async (req: any) => {
  const file: IFile = req.file;

  if (file) {
    const uploadTocloudinary = await fileUploader.uploadTocloudinary(file);
    req.body.admin.profilePhoto = uploadTocloudinary?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });
    return createdAdminData;
  });

  return result;
};

const createDoctor = async (req: any) => {
  const file: IFile = req.file;

  if (file) {
    const uploadTocloudinary = await fileUploader.uploadTocloudinary(file);
    req.body.admin.profilePhoto = uploadTocloudinary?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });
    return createdAdminData;
  });

  return result;
};

const createPatient = async (req: any) => {
  const file: IFile = req.file;

  if (file) {
    const uploadTocloudinary = await fileUploader.uploadTocloudinary(file);
    req.body.admin.profilePhoto = uploadTocloudinary?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });
    return createdAdminData;
  });

  return result;
};

export const userService = {
  createAdmin,
  createDoctor,
  createPatient,
};
