import nextConnect from 'next-connect';
import {
  deleteData,
  getDataById,
  updateData,
} from '../../../controller/usercontroller';

const router = nextConnect();

router.get(getDataById);
router.delete(deleteData);
router.put(updateData);

export default router;
