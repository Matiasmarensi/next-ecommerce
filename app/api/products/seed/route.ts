import { NextRequest, NextResponse } from "next/server";
import data from "@/lib/data";
import dbConnection from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";
import ProductModel from "@/lib/models/ProductModel";

export const GET = async (req: Request, res: Response) => {
  const { users, products } = data;
  dbConnection();
  await UserModel.deleteMany();
  await UserModel.insertMany(users);

  await ProductModel.deleteMany();
  await ProductModel.insertMany(products);

  return NextResponse.json({
    message: "Success",
    users,
    products,
  });
};
