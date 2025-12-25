import { CreateUserTypes, VerifyUserTypes } from "#/@types/user";
import EmailVerificationToken from "#/models/EmailVerificationToken";
import User from "#/models/User";
import { generateEmailTemplate } from "#/utils/emailTemplate";
import { generateOtp } from "#/utils/helper";
import { CreateUserSchema } from "#/utils/validation/validation";
import { MAILPASSWORD, MAILUSERNAME } from "#/utils/variables";
import { RequestHandler } from "express";
import { error } from "node:console";
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
    subject: "PODCAST OTP",
    from: "si@gmail.com",
    html: generateEmailTemplate(otp),
  });
  res.status(200).json({
    message: "Success",
    user: user,
  });
};

export const verifyUserController: RequestHandler = async (
  req: VerifyUserTypes,
  res
) => {
  try {
    const body = req.body;

    const emailUser = await EmailVerificationToken.findOne({
      owner: req.body.userId as String,
    });
    if (emailUser) {
      const verify = await emailUser.compareToken(body.token as string);
      if (!verify) {
        return res.status(401).json({
          error: "Invalid otp",
        });
      } else {
        await User.findByIdAndUpdate(body.userId, {
          verified: true,
        });
        await EmailVerificationToken.findOneAndDelete({
          owner: body.userId as String,
        });
        return res.status(200).json({
          message: "User verified sucessully",
        });
      }
    } else {
      return res.status(404).json({
        error: "User with this id not fouund",
      });
    }
  } catch (e) {
    return res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
};
export const LoginController: RequestHandler = async (req, res) => {};
