import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest){
  const formData = await req.formData();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const profilePic = formData.get("profilePic") as File | null;

  console.log("profile", profilePic?.name);
  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: "Fields are missing" }, { status: 400 });
  }

  try {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userAlreadyExists) {
      return NextResponse.json(
        { error: "User Exists with this Email" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPassword,
        profilePic: profilePic?.name,
      },
    });

    if (newUser) {
      return NextResponse.json(
        {
          message: "User created successfully",
          user: newUser,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("signuError", error);

    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
