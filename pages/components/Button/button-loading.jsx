import { RefreshIcon } from '@heroicons/react/solid';
import React from 'react';

export default function ButtonLoading({ title, loading }) {
  return (
    <button
      className="flex justify-center px-4 py-2 mt-5 text-base font-bold text-white transition duration-200 rounded-full shadow-md bg-cyan-500 hover:ring hover:ring-cyan-500 hover:bg-white hover:text-cyan-500"
      type="submit"
    >
      {loading ? <RefreshIcon className="w-7 h-7 animate-spin" /> : title}
    </button>
  );
}
