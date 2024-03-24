import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validations";


const router = express.Router();


const auth = (role: any) =>{

console.log(role);

}


router.get("/", AdminController.getAllFromDB);

router.get("/:id", AdminController.getByIdFromDB);

router.patch("/:id", validateRequest(adminValidationSchemas.update), AdminController.updateIntoDB);

router.delete('/:id', AdminController.deleteFromDB);

router.delete('/soft/:id', AdminController.softDeletFromDB);

export const AdminRoutes = router;