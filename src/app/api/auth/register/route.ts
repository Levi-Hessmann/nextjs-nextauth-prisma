import { hash } from "bcrypt";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import prisma from "@lib/prisma";

export async function POST(req: Request) {
  const { email, password }: any = await req.json();

  const exists = await prisma.user.findUnique({
    where: { email },
  });

  if (exists) {
    return new Response("User already exists", {
      status: 409,
    });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: await hash(password, 10),
    },
  });

  return NextResponse.json(user);
}

function generateToken() {
  return randomBytes(32).toString("hex") + randomBytes(32).toString("hex");
}
