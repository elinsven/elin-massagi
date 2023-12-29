import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM massage_services;`;

    return NextResponse.json({ massageServices: rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
