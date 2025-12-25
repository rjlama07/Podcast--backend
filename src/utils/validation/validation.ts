import { isValidObjectId } from "mongoose";
import * as yup from "yup";

export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing")
    .min(3, "Name is too short")
    .max(256, "Name is too long"),
  email: yup.string().email().required("Email is missing"),
  password: yup
    .string()
    .required("Password is missing")
    .min(8, "Password is too short")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const VerifyUserSchema = yup.object().shape({
  token: yup.string().trim().required("Token is missing"),
  userId: yup
    .string()
    .trim()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      } else {
        return "";
      }
    })
    .required("Invalid User id"),
});
