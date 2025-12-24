import { CreateUserTypes } from "#/@types/user";
import User from "#/models/User";
import { CreateUserSchema } from "#/utils/validation/validation";
import { RequestHandler } from "express";

export const RegisterController: RequestHandler = async (
  req: CreateUserTypes,
  res
) => {
  console.log(req.body);
  const { email, password, name } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      message: "User with this email already exists",
    });
  }

  const user = new User({ email, password, name });
  await user.save();
  res.status(200).json({
    message: "Success",
    user: user,
  });
};
export const LoginController: RequestHandler = async (req, res) => {};
