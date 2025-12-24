import { Router } from "express";
import { RegisterController } from "#/controller/AuthController";
import { validate } from "#/middleware/validator";
import { CreateUserSchema } from "#/utils/validation/validation";

const router = Router();

router.post("/register", validate(CreateUserSchema), RegisterController);

export default router;
