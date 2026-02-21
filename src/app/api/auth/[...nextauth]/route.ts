import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

async authorize(credentials) {
  console.log('🔐 AUTHORIZE CALLED');
  console.log('📨 Credentials:', credentials);

  try {
    await dbConnect();
    console.log('✅ DB connected inside authorize');

    const user = await User.findOne({
      email: credentials?.email?.toLowerCase(),
    });

    console.log('👤 User found:', user ? 'YES' : 'NO');

    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await new Promise<boolean>((resolve) => {
      user.authenticate(credentials!.password, (err: any, authUser: any) => {
        console.log('🔑 Auth result:', { err, authUser });
        resolve(!err && !!authUser);
      });
    });

    if (!isValid) {
      throw new Error('Invalid password');
    }

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  } catch (err: any) {
    console.error('❌ AUTHORIZE ERROR:', err);
    throw err;
  }
}
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };