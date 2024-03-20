import express  from "express";
import { userRoutes } from "../modules/User/user.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";

const router = express.Router();

const moduleRouters = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/admin",
        route: adminRoutes
    }
]

moduleRouters.forEach(route=> router.use(route.path, route.route))

export default router;