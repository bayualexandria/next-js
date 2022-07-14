import db from '../../config/db';
import bcrypt from 'bcryptjs';
export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).end('Request method harus POST').end();
  const { username, password, cpassword, status_id, is_active } = req.body;
  if (username === undefined || username.length === 0)
    return res.status(400).json({
      username: {
        message: 'Username tidak boleh kosong',
      },
    });

  if (password === undefined || password.length === 0)
    return res.status(400).json({
      password: {
        message: 'Password tidak boleh kosong',
      },
    });

  if (cpassword === undefined || cpassword.length === 0)
    return res.status(400).json({
      password: {
        message: 'Konfirmasi Password tidak boleh kosong',
      },
    });

  if (password !== cpassword)
    return res.status(400).json({
      password: {
        message: 'Password dan Konfirmasi password tidak sama',
      },
    });

  if (status_id === undefined || status_id.length === 0)
    return res.status(400).json({
      status_id: {
        message: 'Status tidak boleh kosong',
      },
    });

  if (!Number(status_id))
    return res.status(400).json({
      status_id: {
        message: 'Status harus berupa angka',
      },
    });

  if (is_active === undefined || is_active.length === 0)
    return res.status(400).json({
      is_active: {
        message: 'is_active tidak boleh kosong',
      },
    });

  if (!Number(is_active))
    return res.status(400).json({
      is_active: {
        message: 'is_active harus berupa angka',
      },
    });

  const created_at = new Date();
  const updated_at = created_at;
  const password_hash = await bcrypt.hash(password, 10);
  try {
    const user = await db('users').insert({
      username,
      password: password_hash,
      status_id,
      is_active,
      created_at,
      updated_at,
    });

    const data = await db('users').where('id', user).first();

    return res.status(200).json({
      data: data,
      message: 'User berhasil ditambahkan',
    });
  } catch (error) {
    if (error.errno === 1062)
      return res.status(400).json({
        username: {
          message: 'Username sudah ada',
        },
        status: 400,
      });

    return res.status(400).json({
      error: error,
      status: 400,
    });
  }
}
