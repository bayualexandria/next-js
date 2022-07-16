import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { authorized } from '../middleware/authPages';

export async function getServerSideProps(ctx) {
  const { token } = await authorized(ctx);
  const response = await fetch('http://localhost:3000/api/user', {
    headers: {
      Authorization: 'JWT ' + token,
    },
  }).then((res) => res.json());
  return { props: { users: response, token } };
}

export default function Post(props) {
  const { token } = props;
  const [data, setData] = useState([]);
  const deleteUser = (id) => {
    const userFilter = data.filter((user) => {
      return user.id !== id;
    });
    const response = fetch('api/user/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'JWT ' + token,
      },
    }).then((res) => res.json());
    if (response) {
      setData(userFilter);
    }
  };
  useEffect(() => {
    if (props.users.message === 'Token kadaluarsa' || data === undefined) {
      Cookies.remove('token');
    }
    setData(props.users.data);
  }, [data, props.users.data, props.users.message]);
  return (
    <div className="flex items-center justify-center h-screen px-10">
      <div className="w-full p-5 rounded-md shadow-md">
        {data !== undefined
          ? data.map((d) => {
              return (
                <div key={d.id} className="flex">
                  <p>{d.username}</p>
                  <button
                    className="px-2 py-1 text-white bg-red-500 rounded-full"
                    onClick={() => deleteUser(d.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          : Cookies.remove('token')}
      </div>
    </div>
  );
}
