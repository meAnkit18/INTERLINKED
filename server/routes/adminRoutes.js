import express from "express";
import { requireAuth } from "../middleware/authm.js";
import { requireAdmin } from "../middleware/admin.js";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();


router.use(requireAuth, requireAdmin);


router.get("/users", adminController.getAllUsers);
router.put("/users/:id/make-admin", adminController.makeAdmin);
router.delete("/users/:id", adminController.deleteUser);


router.get("/posts", adminController.getAllPosts);
router.put('/admin/posts/:id/status', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.delete("/posts/:id", adminController.deletePost);

export default router;
