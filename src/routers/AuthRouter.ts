import { Router } from "express";
import { RegisterController } from "#/controller/AuthController";

const router = Router();

router.post("register", RegisterController);

export default router;
