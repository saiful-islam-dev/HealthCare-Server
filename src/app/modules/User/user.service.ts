import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { fileUploader } from "../../../helper/fileUploader";

const prisma = new PrismaClient();

const createAdmin = async (req: any) => {
  const file = req.file;

  console.log(req.body);

  if (file) {
    const uploadTocloudinary = await fileUploader.uploadTocloudinary(file);
    req.body.admin.profilePhoto = uploadTocloudinary?.secure_url;
    console.log("full data", req.body);
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
};
