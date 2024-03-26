import prisma from "../../../Share/prisma";
import * as bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helper/jwtHelpers";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import emailSender from "./emailSender";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

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

const forgotPassword = async(payload: {email: string}) =>{
  const userData = await prisma.user.findUniqueOrThrow({
    where:{
      email: payload.email,
      status: UserStatus.ACTIVE
    }
  })


  const resetPassToken = jwtHelpers.generateToken(
    {email: userData.email, role: userData.role},
    config.jwt.reset_pass_secret as Secret,
    config.jwt.reset_pass_token_expires_in as string
  )

  const resetPassLink = config.reset_pass_link + `?userId=${userData.id}&token=${resetPassToken}`;

  emailSender(
    userData.email,
    ` <div>
    <p>Dear User,</p>
    <p>Your password reset link 
        <a href=${resetPassLink}>
            <button>
                Reset Password
            </button>
        </a>
    </p>

</div>`)
}

const resetPassword = async (token: string, payload: { id: string, password: string })=>{
  console.log({token}, payload);

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
        id: payload.id,
        status: UserStatus.ACTIVE
    }
});

console.log({userData});

const isValidToken = jwtHelpers.verifyToken(token, config.jwt.reset_pass_secret as Secret)

if (!isValidToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!")
}

// hash password
const password = await bcrypt.hash(payload.password, 12);
console.log(password);

// update into database
const result = await prisma.user.update({
    where: {
        id: payload.id
    },
    data: {
        password
    }
})
console.log({result});
}


export const AuthServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
}