import db from '../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).end('Request method harus POST').end();

  const { username, password } = req.body;

  const checkUser = await db('users').where('username', username).first();
  if (!checkUser)
    return res.status(401).json({
      message: 'Username tidak ditemukan',
    });

  const checkPassword = await bcrypt.compare(password, checkUser.password);

  if (!checkPassword)
    return res.status(401).json({
      message: 'Password salah',
    });

    const token= jwt.sign({
        id: checkUser.id,
        username: checkUser.username,
    },'secret',{
        expiresIn: '60s'
    })

  return res.status(200).json({
    message: 'Login berhasil',
    token
  });
}
