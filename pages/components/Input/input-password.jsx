import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import MessageError from '../Message/message-error';

export default function InputPassword({ name, title, error, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const show = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col gap-y-3">
      <label htmlFor={name} className="text-base font-bold text-slate-500">
        {title}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          id={name}
          className="w-full px-5 py-2 border rounded-md shadow-md outline-none border-cyan-500 hover:ring-2 hover:ring-cyan-300 focus:ring-2 focus:ring-cyan-300"
          onChange={onChange}
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
      {error ? <MessageError message={error.message} /> : ''}
    </div>
  );
}
