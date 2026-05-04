'use client'
import React, { useState } from 'react';

const LoginSignUp = () => {
  const [currentState, setCurrentState] = useState('Login');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
      <main className="flex flex-col items-center justify-center min-h-[80vh] bg-white pt-20 pb-8 px-2 sm:px-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-md mx-auto bg-white border border-neutral-200 px-4 sm:px-8 py-8 sm:py-10">
          <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6 tracking-widest uppercase">
            {currentState === 'Login' ? 'Sign In' : 'Create Account'}
          </h1>
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
            {currentState === 'Sign Up' && (
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-neutral-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-neutral-300 bg-white focus:outline-none focus:border-neutral-900 text-base"
                  placeholder="Your Name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-neutral-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-neutral-300 bg-white focus:outline-none focus:border-neutral-900 text-base"
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 uppercase tracking-wider text-neutral-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-neutral-300 bg-white focus:outline-none focus:border-neutral-900 text-base"
                placeholder="Password"
                required
              />
            </div>
            {currentState === 'Login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-neutral-600 hover:underline"
                  // onClick={...} // Add forgot password logic if needed
                >
                  Forgot your password?
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-neutral-950 text-white py-3 text-sm tracking-[0.2em] uppercase hover:bg-orange-700 transition-colors"
            >
              {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-8 text-center">
            {currentState === 'Login' ? (
              <>
                <span className="text-neutral-600 text-sm">Don't have an account? </span>
                <button
                  className="text-black font-semibold underline text-sm"
                  onClick={() => setCurrentState('Sign Up')}
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                <span className="text-neutral-600 text-sm">Already have an account? </span>
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
  );
};

export default LoginSignUp;