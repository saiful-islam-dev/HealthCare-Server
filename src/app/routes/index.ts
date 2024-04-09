import express from 'express';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { UserRoutes } from '../modules/User/user.routes';
import { AuthRouters } from '../modules/Auth/auth.routes';
import { SpecialtiesRouters } from '../modules/Specialties/specialties.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/auth',
        route: AuthRouters
    },
    {
        path: '/specialties',
        route: SpecialtiesRouters
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;