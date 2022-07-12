import nextConnect from "next-connect";
import { getPost, insertPost } from "../../../controller/postscontroller";

const router = nextConnect();

router.get(getPost);
router.post(insertPost);

export default router;