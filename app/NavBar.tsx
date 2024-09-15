'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const NavBar = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;
  return (
    <div className='flex bg-slate-200 p-3 space-x-3'>
      <Link href='/' className='mr-5'>
        Next.js
      </Link>
      <Link href='/users'>Users</Link>
      {status === 'authenticated' && session?.user && (
        <div>
          <button className='ml-3' onClick={() => signOut()}>
            Logout
          </button>
        </div>
      )}
      {status === 'unauthenticated' && (
        <>
          <Link href='/login'>Login</Link>
          <Link href='/signup'>Sign Up</Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
