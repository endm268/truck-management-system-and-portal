import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

export async function middleware(req: CombineRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// Protect specific routes
export const config = {
  matcher: ["/", "/dashboard"],
};
