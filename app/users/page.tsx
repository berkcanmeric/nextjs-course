import React, { Suspense } from 'react';
import UserTable from './UserTable';
import Link from 'next/link';
import Loading from '../loading';

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  console.log(sortOrder);
  return (
    <>
      <h1 className='text-2xl font-bold'>Users</h1>
      <Link href='/users/new' className='btn btn-primary'>
        New User
      </Link>
      <Suspense fallback={<Loading />}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UsersPage;
