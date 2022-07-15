import { EyeIcon, EyeOffIcon, RefreshIcon } from '@heroicons/react/solid';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import { unauthorized } from '../../middleware/authPages';
import ButtonLoading from '../components/Button/button-loading';
import InputPassword from '../components/Input/input-password';
import InputText from '../components/Input/input-text';
import MessageError from '../components/Message/message-error';

export async function getServerSideProps(ctx) {
  await unauthorized(ctx);
  return { props: {} };
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const data = {
    username,
    password,
  };

  const login = async (e) => {
    e.preventDefault();
    let response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    console.log(response);
    if (response.status === 400 || response.status === 401)
      return setError(response);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Cookies.set('token', response.token);
      console.log(response.token);
      console.log(data);
      return Router.push('/post');
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-5 bg-slate-100 gap-y-8">
      <div className="flex flex-col w-full px-16 py-10 bg-white rounded-md shadow-md gap-y-10 md:w-1/3">
        <h5 className="text-xl font-bold text-center text-slate-500">
          Halaman Login
        </h5>
        <form method="post" className="flex flex-col gap-y-5" onSubmit={login}>
          <InputText
            title="Username"
            error={error.username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputPassword
            title="Password"
            error={error.password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonLoading title="Login" loading={loading} />
        </form>
      </div>
    </div>
  );
}
