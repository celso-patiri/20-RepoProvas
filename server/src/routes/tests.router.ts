import { Router } from "express";
import testsController from "../controllers/tests.controller";
import { CreateTestSchema } from "../interfaces/models";
import verifyJwtHeader from "../middleware/auth/verifyJwtHeader";
import validateBody from "../middleware/validation/validateBody";

const router = Router();

router.post(
  "/tests",
  verifyJwtHeader,
  validateBody(CreateTestSchema),
  testsController.create,
);
router.get("/tests/disciplines", verifyJwtHeader, testsController.getAllByDiscipline);
router.get("/tests/teachers", verifyJwtHeader, testsController.getAllGroupByTeacher);

export default router;
