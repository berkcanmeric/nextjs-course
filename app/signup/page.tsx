'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        // Sign in the user after successful registration
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
          action: 'login', // Specify the action as login
        });

        if (result?.error) {
          setError('Failed to sign in after registration: ' + result.error);
        } else {
          router.push('/');
          router.refresh(); // Force a refresh to update the NavBar
        }
      } else {
        // Handle non-JSON responses
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setError(data.message || 'Something went wrong');
        } catch {
          setError(`Registration failed: ${text}`);
        }
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError('An error occurred during registration');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <h2 className='mb-4 text-2xl'>Sign Up</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='******************'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
