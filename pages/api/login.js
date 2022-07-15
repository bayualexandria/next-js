import db from '../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Request method harus POST' }).end();

  const { username, password } = req.body;

  if (username === undefined || username.length === 0)
    return res.status(400).json({
      username: {
        message: 'Username harus diisi',
      },
      status: 400,
    });

  const checkUser = await db('users').where('username', username).first();
  if (!checkUser)
    return res.status(401).json({
      username: { message: 'Username tidak ditemukan' },
      status: 401,
    });

  if (password === undefined || password.length === 0)
    return res.status(400).json({
      password: {
        message: 'Password harus diisi',
      },
      status: 400,
    });

  const checkPassword = await bcrypt.compare(password, checkUser.password);

  if (!checkPassword)
    return res.status(401).json({
      password: { message: 'Password salah' },
      status: 401,
    });

  const token = jwt.sign(
    {
      id: checkUser.id,
      username: checkUser.username,
    },
    'secret',
    {
      expiresIn: '60s',
    }
  );

  return res.status(200).json({
    message: 'Login berhasil',
    token,
  });
}
