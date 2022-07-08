import nextConnect from 'next-connect';
import { getAllUser, createUser } from '../../../controller/usercontroller';

const router = nextConnect();
router.get(getAllUser);
router.post(createUser);

export default router;
