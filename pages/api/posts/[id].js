import nextConnect from 'next-connect';
import { deletePost, getPostById, updatePost } from '../../../controller/postscontroller';

const router = nextConnect();

router.put(updatePost);
router.get(getPostById);
router.delete(deletePost);

export default router;
