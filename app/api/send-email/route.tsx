import welcometemplate from '@/emails/welcometemplate';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Welcome to Our Platform!',
    react: welcometemplate({ name: 'Berkcan' }),
  });

  return NextResponse.json({ message: 'Email sent successfully' });
}
