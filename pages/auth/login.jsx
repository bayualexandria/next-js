import React from 'react'

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen p-5 bg-slate-100 gap-y-8'>
        <div className="w-full h-full p-5 bg-white rounded-md shadow-md">
        <h5 className='text-xl font-bold text-center text-slate-500'>Halaman Login</h5>
            <form action="" method="post">
                <div className="flex flex-col gap-y-3">
                    <label htmlFor="usename" className='text-base font-bold text-slate-500'>Username</label>
                    <input type="text" name="username" id="username" className="w-full px-5 py-2 border rounded-md shadow-md outline-none border-cyan-500 hover:ring-2 hover:ring-cyan-300 focus:ring-2 focus:ring-cyan-300" />
                </div>
                <div className="flex flex-col gap-y-3">
                    <label htmlFor="usename" className='text-base font-bold text-slate-500'>Username</label>
                    <input type="text" name="username" id="username" className="w-full px-5 py-2 border rounded-md shadow-md outline-none border-cyan-500 hover:ring-2 hover:ring-cyan-300 focus:ring-2 focus:ring-cyan-300" />
                </div>
            </form>
        </div>
    </div>
  )
}
