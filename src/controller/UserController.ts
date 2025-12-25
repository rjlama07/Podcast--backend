import { CreateUserTypes } from "#/@types/user";
import EmailVerificationToken from "#/models/EmailVerificationToken";
import User from "#/models/User";
import { generateOtp } from "#/utils/helper";
import { CreateUserSchema } from "#/utils/validation/validation";
import { MAILPASSWORD, MAILUSERNAME } from "#/utils/variables";
import { RequestHandler } from "express";
import nodemailer from "nodemailer";

export const RegisterController: RequestHandler = async (
  req: CreateUserTypes,
  res
) => {
  const { email, password, name } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      message: "User with this email already exists",
    });
  }
  // Looking to send emails in production? Check out our Email API/SMTP product!
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILUSERNAME,
      pass: MAILPASSWORD,
    },
  });

  const user = new User({ email, password, name });
  await user.save();
  const otp = generateOtp(6);
  const emailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: otp,
  });
  await emailVerificationToken.save();

  transport.sendMail({
    to: email as string,
    from: "si@gmail.com",
    html: `<h1>Your Token is ${otp}</h1>`,
  });
  res.status(200).json({
    message: "Success",
    user: user,
  });
};
export const LoginController: RequestHandler = async (req, res) => {};
