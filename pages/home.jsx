import React, { useState } from 'react';
import {
  CheckCircleIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  RefreshIcon,
} from '@heroicons/react/solid';
const bcrypt = require('bcryptjs');

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusId, setStatusId] = useState('');
  const [isActive, setIsActive] = useState('');
  const [button, setButton] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const [message, setMessage] = useState('');

  const result = {
    username,
    password,
    status_id: statusId,
    is_active: isActive,
  };

  const icon = (
    <>
      <RefreshIcon className="w-5 h-5 animate-spin" />
    </>
  );

  const messageSuccess = (
    <div className="absolute flex items-center justify-center w-full px-5">
      <div className="flex flex-col items-center justify-center w-full p-10 bg-white rounded-md shadow-md md:w-1/3 gap-y-5 sm:w-1/2 lg:w-1/4">
        <CheckCircleIcon className="w-14 h-14 text-lime-500 animate-bounce" />
        <h5 className="text-base font-bold text-center text-slate-500">
          Data berhasil ditambahkan
        </h5>
      </div>
    </div>
  );

  // Get data user
  const getData = async () => {
    try {
      const hasil = await fetch('http://localhost:3000/api/user/1').then(
        (res) => res.json()
      );
      setData(hasil);
    } catch (e) {
      setData('Data tidak bisa dimuat kesalahan URL');
    }
  };

  // Process Loading Data
  const clickButton = () => {
    const icon = (
      <>
        <RefreshIcon className="w-10 h-10 animate-spin text-cyan-500 " />
      </>
    );
    setLoading(icon);
    setTimeout(() => {
      getData();

      setLoading('');
    }, 5000);
  };

  // Insert Data User
  const insertData = async () => {
    setButton(icon);
    console.log(result);
    try {
      let response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      }).then((result) => result.json());
      // if ( response.status === 400 ) {
      //   setMessage(messageSuccess);
      //   setButton(false);
      // }

      console.log(response.message);
        
      
      setTimeout(async () => {
        console.log(response);
        setButton(false);
        setMessage(messageSuccess);
        return response;
      }, 5000);
    } catch (error) {
      setButton('');
    }
  };

  // Show and Hide Password
  const btnPassword = () => {
    setInvisible(!invisible);
  };

  const hideModal = ()=>{
    setMessage('');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-5" onClick={hideModal}>
      <div className="flex flex-col justify-center h-screen gap-y-4">
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="username"
            className="text-base font-bold text-slate-500"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="px-3 py-1.5 border rounded-md shadow-md outline-none border-cyan-500 text-slate-500"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="password"
            className="text-base font-bold text-slate-500"
          >
            Password
          </label>
          <div className="relative w-full h-full">
            <input
              type={invisible ? 'text' : 'password'}
              name="password"
              id="password"
              className="px-3 py-1.5 border rounded-md shadow-md outline-none border-cyan-500 text-slate-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute right-3 top-2">
              <button onClick={btnPassword} className='outline-none'>
                {invisible ? (
                  <EyeOffIcon className="w-5 h-5 text-cyan-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-cyan-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="status_id"
            className="text-base font-bold text-slate-500"
          >
            Status
          </label>
          <input
            type="text"
            name="status_id"
            id="status_id"
            className="px-3 py-1.5 border rounded-md shadow-md outline-none border-cyan-500 text-slate-500"
            onChange={(e) => setStatusId(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="is_active"
            className="text-base font-bold text-slate-500"
          >
            Active
          </label>
          <input
            type="text"
            name="is_active"
            id="is_active"
            className="px-3 py-1.5 border rounded-md shadow-md outline-none border-cyan-500 text-slate-500"
            onChange={(e) => setIsActive(e.target.value)}
          />
        </div>
        <button
          onClick={insertData}
          type="submit"
          className="flex items-center justify-center p-2 text-white rounded-md shadow-md outline-none bg-lime-500"
        >
          {button ? button : 'Simpan'}
        </button>
      </div>
      {message}
      <button
        onClick={clickButton}
        className="px-4 py-2 text-base font-bold text-white transition duration-200 rounded-full shadow-md bg-lime-500 ring ring-lime-200 hover:ring hover:ring-lime-500 hover:bg-white hover:text-lime-500"
      >
        Get Data
      </button>
      <div>{loading}</div>
      {data.map((d) => {
        return (
          <a key={d.id} href="">
            {d.username}
          </a>
        );
      })}
    </div>
  );
}
