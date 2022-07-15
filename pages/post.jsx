import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { authorized } from '../middleware/authPages';

export async function getServerSideProps(ctx) {
  const { token } = await authorized(ctx);
  const response = await fetch('http://localhost:3000/api/user', {
    headers: {
      Authorization: 'JWT ' + token,
    },
  }).then((res) => res.json());
  console.log(response.message);
  return { props: { users: response } };
}

export default function Post(props) {
  console.log(props.users.message);
  useEffect(() => {
    if (props.users.message === 'Token kadaluarsa') {
      Cookies.remove('token');
    }
  });

  console.log(props.users.message);
  return (
    <div className="flex items-center justify-center h-screen px-10">
      <div className="w-full p-5 rounded-md shadow-md">
        <table className="table-fixed">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Status</th>
              <th>#</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
