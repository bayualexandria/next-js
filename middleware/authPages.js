export function unauthorized(ctx) {
  return new Promise((resolve) => {
    const headers = ctx.req.headers.cookie;
    console.log(headers);

    const token = headers.split('=');
    const [key, value] = [token[0], token[1]];
    if (value)
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
    const headers = ctx.req.headers.cookie;
    const token = headers.split('=');
    const [key, value] = [token[0], token[1]];
    if (!value)
      return ctx.res
        .writeHead(302, {
          Location: '/auth/login',
        })
        .end();

    return resolve({ token: value });
  });
}
