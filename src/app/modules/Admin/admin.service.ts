import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../Share/prisma";

const getAllFromDB = async (params: any, options: any) => {

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

  return result;
};

export const AdminService = {
  getAllFromDB
}