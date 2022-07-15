import React from 'react';
import { authorized } from '../middleware/authPages';

export async function getServerSideProps(ctx) {
  const {token} = await authorized(ctx);
  console.log(token);
  return { props: {} };
}

export default function Post() {

  return <div className='flex items-center justify-center h-screen px-10'>
    <div className="w-full p-5 rounded-md shadow-md">
      <table className='table-fixed'>
        <thead>
          <tr>
            <th>#</th>
            <th>#</th>
            <th>#</th>
            <th>#</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>;
}
