import nextConnect from "next-connect";
import { deleteUser, getUserById, updateUser } from "../../../controller/usercontroller";

const router = nextConnect();

router.get(getUserById);
router.put(updateUser);
router.delete(deleteUser);

export default router;

