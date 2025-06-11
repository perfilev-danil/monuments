import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ isAuthenticated: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
