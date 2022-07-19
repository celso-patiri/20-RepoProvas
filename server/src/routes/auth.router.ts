import { Router } from "express";
import authController from "../controllers/auth.controller";
import { SignUserSchema } from "../interfaces/models";
import validateBody from "../middleware/validation/validateBody";

const router = Router();

router.post("/signup", validateBody(SignUserSchema), authController.signUserUp);
router.post("/signin", validateBody(SignUserSchema), authController.signUserIn);

export default router;
