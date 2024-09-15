import prisma from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        action: { label: 'Action', type: 'text' }, // Add this to distinguish between login and register
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('Invalid credentials');
          throw new Error('Invalid credentials');
        }

        try {
          if (credentials.action === 'register') {
            // Handle registration
            const existingUser = await prisma.user.findUnique({
              where: { email: credentials.email },
            });

            if (existingUser) {
              console.error('User already exists');
              throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                hashedPassword,
              },
            });

            console.log('User registered successfully:', newUser.email);
            return { id: newUser.id, email: newUser.email, name: newUser.name };
          } else {
            // Handle login (existing code)
            const user = await prisma.user.findUnique({
              where: { email: credentials.email },
            });

            if (!user || !user.hashedPassword) {
              throw new Error('User not found');
            }

            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.hashedPassword
            );

            if (!isPasswordValid) {
              throw new Error('Invalid password');
            }

            return { id: user.id, email: user.email, name: user.name };
          }
        } catch (error) {
          console.error('Error in authorize function:', error);
          throw new Error(
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred'
          );
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login', // Specify custom login page
  },
  session: {
    strategy: 'jwt',
  },
};
