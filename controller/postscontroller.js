import db from '../config/db';

const insertPost = async (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Request method harus POST' }).end();
  const { title, content } = req.body;

  if (title === undefined || title.length === 0)
    return res.status(400).json({
      title: {
        message: 'Title tidak boleh kosong',
        status: 400,
      },
    });

  if (content === undefined || content.length === 0)
    return res.status(400).json({
      content: {
        message: 'Content tidak boleh kosong',
        status: 400,
      },
    });

  try {
    const data = await db('posts').insert({
      title,
      content,
    });
    const createData = await db('posts').where('id', data).first();
    res.status(200);
    res.json({
      data: createData,
      message: 'Post created successfully',
    });
  } catch (error) {
    console.log(error);
  }
};

const getPost = async (req, res) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Request method harus GET' }).end();

  const getData = await db('posts');

  res.status(200).json({
    data: getData,
    message: 'Get data success',
  });
};

const getPostById = async (req, res) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Request method harus GET' }).end();
  const { id } = req.query;
  const dataById = await db('posts').where('id', id).first();

  if (!dataById)
    return res.status(400).json({
      id: id,
      message: 'Id tidak ditemukan',
    });

  try {
    res.status(200);
    res.json({
      data: dataById,
      message: 'Get data success',
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (req, res) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Request method harus PUT' }).end();
  const { id } = req.query;
  const { title, content } = req.body;
  const { updated_at } = new Date();
  const dataById = await db('posts').where('id', id).first();
  if (!dataById)
    return res.status(400).json({
      title: {
        message: 'Id tidak ditemukan',
        status: 400,
      },
    });
  if (title === undefined || title.length === 0)
    return res.status(400).json({
      title: {
        message: 'Title tidak boleh kosong',
        status: 400,
      },
    });

  if (content === undefined || content.length === 0)
    return res.status(400).json({
      content: {
        message: 'Content tidak boleh kosong',
        status: 400,
      },
    });

  try {
    const data = await db('posts').where('id', id).update({
      title,
      content,
      updated_at,
    });
    const updateData = await db('posts').where('id', data).first();

    res.status(200);
    res.json({
      data: updateData,
      message: 'Post updated successfully',
    });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  if (req.method !== 'DELETE')
    return res
      .status(405)
      .json({ message: 'Request method harus DELETE' })
      .end();
  const { id } = req.query;
  const dataById = await db('posts').where('id', id).first();
  if (!dataById)
    return res.status(400).json({
      id: id,
      message: 'Id tidak ditemukan',
    });
  try {
    const data = await db('posts').where('id', id).del();
    res.status(200);
    res.json({
      data: data,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.log(error);
  }
};

export { getPost, insertPost, updatePost, getPostById,deletePost };
