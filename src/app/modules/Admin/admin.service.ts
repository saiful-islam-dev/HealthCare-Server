import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

const getAllFromDB = async (params: any, options: any) => {

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
    where: whereCondition
  });

  return result;
};

export const AdminService = {
  getAllFromDB
}