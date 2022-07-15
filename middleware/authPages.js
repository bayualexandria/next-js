import cookies from 'next-cookies';

export function unauthorized(ctx) {
  return new Promise((resolve) => {
    const allCookie = cookies(ctx);
    if (allCookie.token)
      return ctx.res
        .writeHead(302, {
          Location: '/post',
        })
        .end();

    return resolve('unautehnticated');
  });
}

export function authorized(ctx) {
  return new Promise((resolve) => {
    const allCookie = cookies(ctx);
    if (!allCookie.token)
      return ctx.res
        .writeHead(302, {
          Location: '/auth/login',
        })
        .end();

    return resolve({ token: allCookie.token });
  });
}
