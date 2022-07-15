import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

export default function Register() {
  const [pVisible, setPVisible] = useState(false);
  const [cPVisible, setCPVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isActive, setIsActive] = useState(false);

  const data = {
    username,
    password,
    cpassword: confirmPassword,
    is_active: isActive ? 1 : 0,
    status_id: 1,
  };

  const save = async () => {
    try {
      
      let register = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      console.log(register);
      if (register.status === 400) return setError(register);
      console.log(register);
    } catch (error) {
      console.log(error);
    }
  };

  const showPassword = () => {
    setPVisible(!pVisible);
  };

  const showCPassword = () => {
    setCPVisible(!cPVisible);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-5 bg-gray-100 rounded-lg shadow-lg">
        <h5 className="mb-10 text-lg font-bold text-center text-slate-500">
          Halaman Register
        </h5>
        <div className="flex flex-col px-8 gap-y-5">
          <div className="flex flex-col gap-y-3">
            <label
              htmlFor="username"
              className="text-sm font-bold text-slate-500"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full px-2 py-2 transition duration-200 border rounded-md shadow-md outline-none border-cyan-500 focus:ring-cyan-200 focus:ring hover:ring hover:ring-cyan-200"
              name="username"
              id="usename"
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="text-sm font-thin text-red-500">
              {error.username ? error.username.message : ''}
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <label
              htmlFor="password"
              className="text-sm font-bold text-slate-500"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={pVisible ? 'text' : 'password'}
                className="relative w-full px-3 py-2 transition duration-200 border rounded-md shadow-md outline-none border-cyan-500 focus:ring-cyan-200 focus:ring hover:ring hover:ring-cyan-200"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-2 outline-none top-2.5 overflow-hidden bg-white w-1/6 flex justify-center"
                onClick={showPassword}
              >
                {pVisible ? (
                  <EyeOffIcon className="w-5 h-5 text-cyan-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-cyan-500" />
                )}
              </button>
            </div>
            <p className="text-sm font-thin text-red-500">
              {error.password ? error.password.message : ''}
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <label
              htmlFor="cpassword"
              className="text-sm font-bold text-slate-500"
            >
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={cPVisible ? 'text' : 'password'}
                className="relative w-full px-3 py-2 transition duration-200 border rounded-md shadow-md outline-none border-cyan-500 focus:ring-cyan-200 focus:ring hover:ring hover:ring-cyan-200"
                name="cpassword"
                id="cpassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="absolute right-2 outline-none top-2.5 overflow-hidden bg-white w-1/6 flex justify-center"
                onClick={showCPassword}
              >
                {cPVisible ? (
                  <EyeOffIcon className="w-5 h-5 text-cyan-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-cyan-500" />
                )}
              </button>
            </div>
            <p className="text-sm font-thin text-red-500">
              {error.cpassword ? error.cpassword.message : ''}
            </p>
          </div>
          <div className="flex flex-row">
            <input
              type="checkbox"
              name="is_active"
              id="is_active"
              className="w-3 h-3 accent-cyan-300"
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>
          <button
            className="px-4 py-2 text-base font-bold text-white transition duration-200 rounded-full shadow-md bg-cyan-500 hover:ring hover:ring-cyan-500 hover:text-cyan-500 hover:bg-white"
            onClick={save}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
