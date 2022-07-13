import nextConnect from 'next-connect';
import { getData, insertData } from '../../../controller/usercontroller';

const router = nextConnect();

router.get(getData);
router.post(insertData);

export default router;
