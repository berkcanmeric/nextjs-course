import { NextRequest, NextResponse } from 'next/server';
import { schema } from './schema';
import prisma from '@/prisma/client';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: validation.data.email },
  });

  if (user) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(validation.data.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
    },
  });
  return NextResponse.json({ email: newUser.email });
}
