import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';


const router = express.Router();


router.post("/", auth("ADMIN", "SUPER_ADMIIN"),userController.createAdmin);


export const UserRoutes = router;