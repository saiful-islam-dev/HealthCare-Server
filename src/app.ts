import express, { Application, Request, Response } from "express";
import cors from 'cors';
import { userRoutes } from "./app/modules/User/user.routes";


const app: Application = express()
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/user", userRoutes)

app.get("/", (req: Request, res: Response)=>{
    res.send({
        Message: "Ph Heath care service..."
    })
});

export default app;