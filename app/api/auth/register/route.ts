//ruta para user register
import bcrypt from "bcrypt";
import dbConnection from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/lib/models/UserModel";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { name, email, password } = await req.json();
    dbConnection();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    const user = await UserModel.create(newUser);
    return NextResponse.json(
      {
        message: "user created",
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
};
