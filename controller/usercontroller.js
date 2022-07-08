import { query } from '../config/db';
const bcrypt = require('bcryptjs');

const getAllUser = async (req, res) => {
  try {
    const queryData = 'SELECT * FROM users';
    const data = await query({ query: queryData });
    res.status(200).json(data);
  } catch (e) {}
};

const getUserById = async (req, res) => {
  let id = req.query.id;
  try {
    const queryData = 'SELECT * FROM users WHERE id=?';
    const values = [id];
    const data = await query({ query: queryData, values: values });
    res.status(200).json(data);
  } catch (e) {}
};

const createUser = async (req, res) => {
  let { username, password, status_id, is_active } = req.body;
  if (username === undefined || username.length === 0)
    res.status(400).json({
      data: { username: username },
      message: 'Username tidak boleh kosong',
    });

  if (password === undefined || password.length === 0)
    res.status(400).json({
      data: { password },
      message: 'Password tidak boleh kosong',
    });

  if (status_id === undefined || status_id.length === 0)
    res.status(400).json({
      data: { status_id },
      message: 'Status tidak boleh kosong',
    });
  if (!Number(status_id))
    res.status(400).json({
      data: { status_id },
      message: 'Status harus berupa angka',
    });

  if (is_active === undefined || is_active === 0)
    res.status(400).json({
      data: { is_active },
      message: 'is_active tidak boleh kosong',
    });
  if (!Number(is_active))
    res.status(400).json({
      data: { is_active },
      message: 'is_active harus berupa angka',
    });

  const date = new Date();
  const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const updatedAt = createdAt;
  const encryptPassword = await bcrypt.hash(password, 10);
  const values = [
    username,
    encryptPassword,
    status_id,
    is_active,
    createdAt,
    updatedAt,
  ];
  try {
    const queryData =
      'INSERT INTO users (username,password,status_id,is_active,created_at,updated_at) VALUES (?,?,?,?,?,?)';
    const data = await query({ query: queryData, values: values });

    res.json({
      data: {
        username,
        password: encryptPassword,
        status_id,
        is_active,
        created_at: createdAt,
        updated_at: updatedAt,
      },
      message: 'Data berhasil ditambahkan',
      status: 200,
    });
  } catch (e) {
    res.status(400).json({ message: 'Gagal membuat user' });
  }
};

const updateUser = async (req, res) => {
  let id = req.query.id;
  let { username, password, status_id, is_active } = req.body;
  if (username === undefined || username.length === 0)
    res.status(400).json({
      data: { username: username },
      message: 'Username tidak boleh kosong',
    });

  if (password === undefined || password.length === 0)
    res.status(400).json({
      data: { password },
      message: 'Password tidak boleh kosong',
    });

  if (status_id === undefined || status_id.length === 0)
    res.status(400).json({
      data: { status_id },
      message: 'Status tidak boleh kosong',
    });
  if (!Number(status_id))
    res.status(400).json({
      data: { status_id },
      message: 'Status harus berupa angka',
    });

  if (is_active === undefined || is_active === 0)
    res.status(400).json({
      data: { is_active },
      message: 'is_active tidak boleh kosong',
    });
  if (!Number(is_active))
    res.status(400).json({
      data: { is_active },
      message: 'is_active harus berupa angka',
    });

  const date = new Date();
  const updatedAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const encryptPassword = await bcrypt.hash(password, 10);
  const values = [username, encryptPassword, status_id, is_active, updatedAt];

  const userId = await query({
    query: 'SELECT id FROM users WHERE id=?',
    values: [id],
  });

  try {
    const queryData = `UPDATE users SET username=?,password=?,status_id=?,is_active=?,updated_at=? WHERE id=${id}`;
    const data = await query({ query: queryData, values: values });

    res.json({
      id: userId[0].id,
      data: {
        username,
        password: encryptPassword,
        status_id,
        is_active,
        updated_at: updatedAt,
      },
      message: 'Data berhasil diupdate',
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Gagal memperbarui user, id yang anda masukan tidak ditemukan',
    });
  }
};

const deleteUser = async (req, res) => {
  let id = req.query.id;
  const userId = await query({
    query: 'SELECT id FROM users WHERE id=?',
    values: [id],
  });
  try {
    const queryData = `DELETE FROM users WHERE id=${id}`;
    const data = await query({ query: queryData });
    res.json({
      id: userId[0].id,
      message: 'Data berhasil dihapus',
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Gagal menghapus user, id yang anda masukan tidak ditemukan',
    });
  }
};

export { getAllUser, getUserById, createUser, updateUser, deleteUser };
