import React from 'react';
import MessageError from '../Message/message-error';

export default function InputText({ name, title, error, onChange }) {
  return (
    <div className="flex flex-col gap-y-3">
      <label htmlFor={name} className="text-base font-bold text-slate-500">
        {title}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className="w-full px-5 py-2 border rounded-md shadow-md outline-none border-cyan-500 hover:ring-2 hover:ring-cyan-300 focus:ring-2 focus:ring-cyan-300"
        onChange={onChange}
      />
      {error ? <MessageError message={error.message} /> : ''}
    </div>
  );
}
