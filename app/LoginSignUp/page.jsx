'use client'
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

const LoginSignUp = () => {
  const [currentState, setCurrentState] = useState('Login');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <Head>
        <title>Unice Stitches | {currentState}</title>
      </Head>
      <Navbar />
      
      <main className="flex flex-col items-center justify-center min-h-[80vh] bg-white pt-20 pb-8 px-2 sm:px-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg px-4 sm:px-8 py-8 sm:py-10">
          <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6 tracking-widest uppercase">
            {currentState === 'Login' ? 'Sign In' : 'Create Account'}
          </h1>
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
            {currentState === 'Sign Up' && (
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-black text-base"
                  placeholder="Your Name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-black text-base"
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-black text-base"
                placeholder="Password"
                required
              />
            </div>
            {currentState === 'Login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-gray-600 hover:underline"
                  // onClick={...} // Add forgot password logic if needed
                >
                  Forgot your password?
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full font-semibold text-base tracking-widest uppercase hover:bg-gray-900 transition"
            >
              {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-8 text-center">
            {currentState === 'Login' ? (
              <>
                <span className="text-gray-600 text-sm">Don't have an account? </span>
                <button
                  className="text-black font-semibold underline text-sm"
                  onClick={() => setCurrentState('Sign Up')}
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-600 text-sm">Already have an account? </span>
                <button
                  className="text-black font-semibold underline text-sm"
                  onClick={() => setCurrentState('Login')}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginSignUp;