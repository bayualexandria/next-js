import React from 'react';
import { authorized } from '../middleware/authPages';

export async function getServerSideProps(ctx) {
  const auth = await authorized(ctx);
  console.log(auth);
  return { props: {} };
}

export default function Post() {
  return <div>Post</div>;
}
