import { Admin, Prisma, UserRole, UserStatus } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../Share/prisma";
import { IPaginationOptions } from "../../interface/pagination";
import { IAdminFilterRequest } from "./admin.interface";

const getAllFromDB = async (params: IAdminFilterRequest, options: IPaginationOptions) => {

  const {limit, page, sortBy, sortOrder} = paginationHelper.calculatePagination(options);

  const {searchTerm, ...filterdata} = params;

  const andCondition: Prisma.AdminWhereInput[] = [];

  const adminSearchAbleFields = ["name", "email"]

  if(params.searchTerm){
    andCondition.push({
      OR: adminSearchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
    },
    )
  }

  // Object.keys(filterdata).map(keys =>({
  //   const data = filterdata[keys]
  //   return data
  //   }))

  if (Object.keys(filterdata).length > 0) {
    andCondition.push({
      AND: Object.keys(filterdata).map(keys =>({
        [keys] : {
          equals: filterdata[keys]
        }
      }))
    })
  }

  andCondition.push({
    isDeleted: false
})

console.log("find many",andCondition);

  const whereCondition: Prisma.AdminWhereInput = {AND: andCondition}

  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip: (Number(page) -1) * limit,
    take: Number(limit),
    orderBy: options.sortBy && options.sortOrder ? {
      [options.sortBy]: options.sortOrder
    } : {
      createdAt: "desc"
    }
  });

  const total = await prisma.admin.count({
    where: whereCondition
  })

  return {
    meta: {
      page,
      limit,
      total
    },
    data:result
  };
};

const getByIdFromDB = async(id: string) =>{
  const result = await prisma.admin.findUnique({
    where:{
      id,
      isDeleted: false
    }
  })

  return result;
}

const updateIntoDB = async(id: string, data: Partial<Admin>): Promise<Admin> =>{
  await prisma.admin.findUniqueOrThrow({ where:{id, isDeleted: false}})
  
  const result = await prisma.admin.update({
    where: {
      id,
      isDeleted: false
    },
    data
  })

  return result;
}

const deleteFromDB = async(id: string) =>{

  await prisma.admin.findUniqueOrThrow({
    where:{
      id
    }
  })

const result = await prisma.$transaction(async(transactionClint)=>{
  const adminDeletedData = await transactionClint.admin.delete({
    where:{
      id
    }
  })

  const userDeletedData = await transactionClint.user.delete({
    where: {
      email: adminDeletedData.email
    }
  })

  return adminDeletedData;
})

return result;
}  


const softDeletFromDB = async(id: string) =>{
  await prisma.admin.findUniqueOrThrow({
    where: {id}
  })

  const result = await prisma.$transaction(async(transactionClint)=>{
    const adminDeletedData = await transactionClint.admin.update({
      where:{
        id
      },
      data:{
        isDeleted: true
      }
    })
  
    const userDeletedData = await transactionClint.user.update({
      where: {
        email: adminDeletedData.email
      },
      data: {
        status: UserStatus.DELETED
    }
    })
  
    return adminDeletedData;
  })
  
  return result;
  }
  

export const AdminService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeletFromDB
}