import prisma from "../../../Share/prisma";
import * as bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helper/jwtHelpers";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { date } from "zod";

const loginUser = async (payload: {
    email: string,
    password: string
}) =>{
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: payload.email
        }
    })

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);


    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }

    const accessToken = jwtHelpers.generateToken(
        {email: userData.email, role: userData.role}, 
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    )

        const refreshToken = jwtHelpers.generateToken(
            {email: userData.email, role: userData.role}, 
            config.jwt.refresh_token_secret as Secret,
            config.jwt.refresh_token_expires_in as string
        )
        
        console.log({refreshToken});

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    }
};


const refreshToken = async (token: string) => {
  let decodedData: any;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as string
    );
  } catch (err) {
    throw new Error("You are not authorized!");
  }
  console.log(decodedData);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  console.log(userData);

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async(user: any, payload: any)=>{
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE
    }
  })

  console.log(userData);

  const isCorrectPassword = await bcrypt.compare(payload.oldPassword, userData.password)

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!")
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where:{
      email: userData.email
    },
    data:{
      password: hashedPassword,
      needPasswordChange: false
    }
  })

  return {
    message: "Password Changed Successfully!"
  }

}

export const AuthServices = {
    loginUser,
    refreshToken,
    changePassword
}