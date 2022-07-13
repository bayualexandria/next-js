import db from '../config/db';
var bcrypt = require('bcryptjs');
import authorization from '../middleware/authorization';

const getData = async (req, res) => {
  if (req.method !== 'GET')
    return res.json({ message: 'Request method harus GET', status: 400 }).end();
  authorization(req, res);

  const getData = await db('users');
  res.status(200).json({
    data: getData,
    message: 'Get data success',
  });
};

const insertData = async (req, res) => {
  if (req.method !== 'POST')
    return res
      .json({ message: 'Request method harus POST', status: 400 })
      .end();
  authorization(req, res);
  const { username, password, status_id, is_active } = req.body;

  if (username === undefined || username.length === 0)
    return res.status(400).json({
      username: {
        message: 'Username tidak boleh kosong',
      },
      status: 400,
    });

  if (password === undefined || password.length === 0)
    return res.status(400).json({
      password: {
        message: 'Password tidak boleh kosong',
      },
      status: 400,
    });

  if (status_id === undefined || status_id.length === 0)
    return res.status(400).json({
      status_id: {
        message: 'Status tidak boleh kosong',
      },
      status: 400,
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
        message: 'Status tidak boleh kosong',
      },
      status: 400,
    });

  if (!Number(is_active))
    return res.status(400).json({
      is_active: {
        message: 'Status harus berupa angka',
      },
    });

  const created_at = new Date();
  const updated_at = created_at;

  try {
    const data = await db('users').insert({
      username,
      password: bcrypt.hashSync(password, 10),
      status_id,
      is_active,
      created_at,
      updated_at,
    });

    const createData = await db('users').where('id', data).first();
    res.status(200);
    res.json({
      data: createData,
      message: 'User created successfully',
    });
  } catch (error) {
    console.log(error);
    if (error.code === 'ER_DUP_ENTRY')
      return res.status(400).json({
        username: {
          message: 'Username sudah ada',
        },
        data: error,
        status: 400,
      });

    return res.status(400).json({
      error: error,
      status: 400,
    });
  }
};

const getDataById = async (req, res) => {
  if (req.method !== 'GET')
    return res.json({ message: 'Request method harus GET', status: 400 }).end();
  authorization(req, res);
  const { id } = req.query;

  authorization(req, res);
  try {
    const getData = await db('users').where('id', id).first();
    if (!getData) {
      res.status(400).json({
        id: id,
        message: 'Data yang anda cari tidak ditemukan',
      });
    }
    res.status(200).json({
      data: getData,
      message: 'Data berhasil ditampilkan',
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (req, res) => {
  if (req.method !== 'DELETE')
    return res
      .json({ message: 'Request method harus DELETE', status: 400 })
      .end();
  authorization(req, res);
  const { id } = req.query;
  try {
    const deleteData = await db('users').where('id', id).del();
    res.status(200).json({
      data: deleteData,
      message: 'Delete data success',
    });
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (req, res) => {
  if (req.method !== 'PUT')
    return res.json({ message: 'Request method harus PUT', status: 400 }).end();
  authorization(req, res);
  const { id } = req.query;
  const { username, password, status_id, is_active } = req.body;

  if (username === undefined || username.length === 0)
    return res.status(400).json({
      username: {
        message: 'Username tidak boleh kosong',
      },
      status: 400,
    });

  if (password === undefined || password.length === 0)
    return res.status(400).json({
      password: {
        message: 'Password tidak boleh kosong',
      },
      status: 400,
    });

  if (status_id === undefined || status_id.length === 0)
    return res.status(400).json({
      status_id: {
        message: 'Status tidak boleh kosong',
      },
      status: 400,
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
        message: 'Status tidak boleh kosong',
      },
      status: 400,
    });

  if (!Number(is_active))
    return res.status(400).json({
      is_active: {
        message: 'Status harus berupa angka',
      },
    });

  const updated_at = new Date();

  try {
    await db('users')
      .where('id', id)
      .update({
        username,
        password: bcrypt.hashSync(password, 10),
        status_id,
        is_active,
        updated_at,
      });

    const updateData = await db('users').where('id', id).first();
    res.status(200).json({
      data: updateData,
      message: 'Data berhasil diupdate',
    });
  } catch (error) {
    console.log(error);
  }
};
export { getData, insertData, getDataById, deleteData, updateData };
