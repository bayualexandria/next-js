import { EyeIcon, EyeOffIcon, RefreshIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const data = {
    username,
    password,
  };

  const iconLoading = (
    <>
      <RefreshIcon className="w-7 h-7 animate-spin" />
    </>
  );
  const login = async (e) => {
    e.preventDefault();
    let response =await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    console.log(response);
    // setLoading(iconLoading);
    // setTimeout(() => {
    //   setLoading(false);
    //   console.log(data);
    // }, 5000);
  };

  const show = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-5 bg-slate-100 gap-y-8">
      <div className="flex flex-col w-full px-16 py-10 bg-white rounded-md shadow-md gap-y-10 md:w-1/3">
        <h5 className="text-xl font-bold text-center text-slate-500">
          Halaman Login
        </h5>
        <form method="post" className="flex flex-col gap-y-5" onSubmit={login}>
          <div className="flex flex-col gap-y-3">
            <label
              htmlFor="usename"
              className="text-base font-bold text-slate-500"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-5 py-2 border rounded-md shadow-md outline-none border-cyan-500 hover:ring-2 hover:ring-cyan-300 focus:ring-2 focus:ring-cyan-300"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label
              htmlFor="password"
              className="text-base font-bold text-slate-500"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                className="w-full px-5 py-2 border rounded-md shadow-md outline-none border-cyan-500 hover:ring-2 hover:ring-cyan-300 focus:ring-2 focus:ring-cyan-300"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute right-2 top-2.5">
                <button
                  className="px-2 bg-white outline-none"
                  type="button"
                  onClick={show}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5 text-cyan-500" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-cyan-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            className="flex justify-center px-4 py-2 mt-5 text-base font-bold text-white transition duration-200 rounded-full shadow-md bg-cyan-500 hover:ring hover:ring-cyan-500 hover:bg-white hover:text-cyan-500"
            type="submit"
          >
            {loading ? loading : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
