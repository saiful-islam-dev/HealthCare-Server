import prisma from "../../../Share/prisma";
import * as bcrypt from "bcrypt";

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
};


const refreshToken = async (token: string) => {
   
};

export const AuthServices = {
    loginUser,
    refreshToken
}