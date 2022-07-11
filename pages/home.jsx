import React, { useState, useEffect } from 'react';
import {
  CheckCircleIcon,
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
  const [messageSuccess, setMessageSuccess] = useState('');
  const [messageError, setMessageError] = useState('');

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

  const showMessageSuccess = (
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
      const hasil = await fetch('http://localhost:3000/api/user')
        .then((res) => res.json())
        .then((data) => data);
      console.log(hasil[0]);
      setData(hasil);
    } catch (e) {
      setData('Data tidak bisa dimuat kesalahan URL');
    }
  };

  // Insert Data User
  const insertData = async () => {
    try {
      let response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      }).then((result) => result.json());
      if (response.status === 400) {
        return setMessageError(response);
      }
      setButton(icon);

      setTimeout(async () => {
        setButton(false);
        setMessageSuccess(showMessageSuccess);
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

  const hideModal = () => {
    setMessageSuccess('');
    setMessageError('');
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen gap-y-5"
      onClick={hideModal}
    >
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
          <p className="text-sm font-thin text-red-500">
            {messageError.username ? messageError.username.message : ''}
          </p>
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
              <button onClick={btnPassword} className="outline-none">
                {invisible ? (
                  <EyeOffIcon className="w-5 h-5 text-cyan-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-cyan-500" />
                )}
              </button>
            </div>
          </div>
          <p className="text-sm font-thin text-red-500">
            {messageError.password ? messageError.password.message : ''}
          </p>
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
          <p className="text-sm font-thin text-red-500">
            {messageError.status_id ? messageError.status_id.message : ''}
          </p>
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
          <p className="text-sm font-thin text-red-500">
            {messageError.is_active ? messageError.is_active.message : ''}
          </p>
        </div>
        <button
          onClick={insertData}
          type="submit"
          className="flex items-center justify-center p-2 text-white rounded-md shadow-md outline-none bg-lime-500"
        >
          {button ? button : 'Simpan'}
        </button>
      </div>
      {messageSuccess}
      <table className="table-fixed">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Status</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => {
            return (
              <tr key={d.id} href="">
                <td>{}</td>
                <td>{d.username}</td>
                <td>
                  {d.status_id === 1
                    ? 'Admin'
                    : d.status_id === 2
                    ? 'Guru'
                    : 'Siswa'}
                </td>
                <td>{d.created_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
