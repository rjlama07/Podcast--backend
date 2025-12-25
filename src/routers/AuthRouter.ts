import { Router } from "express";
import {
  RegisterController,
  verifyUserController,
} from "#/controller/UserController";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  VerifyUserSchema,
} from "#/utils/validation/validation";

const router = Router();

router.post("/register", validate(CreateUserSchema), RegisterController);
router.post("/verify-email", validate(VerifyUserSchema), verifyUserController);

export default router;
