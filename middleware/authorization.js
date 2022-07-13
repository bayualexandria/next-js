import jwt from 'jsonwebtoken';

export default function authorization(req, res) {
  return new Promise((resolve, reject) => {
    const { authorization } = req.headers;

    if (!authorization)
      return res
        .status(401)
        .json({
          message: 'Belum terauntentikasi',
        })
        .end();

    const authSplit = authorization.split(' ');
    const [authType, authToken] = [authSplit[0], authSplit[1]];

    if (authType !== 'JWT')
      return res
        .status(401)
        .json({
          message: 'Type token yang anda masukan tidak sesuai',
        })
        .end();

    return jwt.verify(authToken, 'secret', function (err, decode) {
      if (err)
        return res
          .status(401)
          .json({
            message: err,
          })
          .end();

      return resolve(decode);
    });
  });
}
