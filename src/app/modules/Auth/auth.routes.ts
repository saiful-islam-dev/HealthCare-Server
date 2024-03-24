import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const route = express.Router();


route.post("/login", AuthController.loginUser);

route.post("/refresh-token", AuthController.refreshToken);

route.post("/change-password", auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.SUPER_ADMIN, UserRole.PATIENT), AuthController.changePassword);

export const AuthRouters = route;