import { NextFunction, Request, Response } from "express";
import { jwtHelpers } from "../../helper/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization;
        if (!token) {
          throw new Error("Yow are not authorization");
        }
        const varifiedUser = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret)
  
        req.user = varifiedUser;
  
        console.log(varifiedUser);
  
        if(roles.length && !roles.includes(varifiedUser.role)) {
          throw new Error("Forbetern");
        }
  
        next();
      } catch (error) {
        next(error);
      }
    };
  }    

  export default auth;