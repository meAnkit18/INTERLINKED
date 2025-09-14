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
router.put("/posts/:id/status", adminController.updatePostStatus);
router.delete("/posts/:id", adminController.deletePost);

export default router;
