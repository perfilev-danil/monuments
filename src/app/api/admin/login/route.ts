// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET!,
    { expiresIn: "8h" } // Токен на 8 часов
  );

  const response = NextResponse.json({ success: true }, { status: 200 });

  response.cookies.set({
    name: "admin_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 часов
    path: "/",
  });

  return response;
}
