import { Request } from "express";

export interface CreateUserTypes extends Request {
  body: {
    name: String;
    email: String;
    password: String;
  };
}

export interface VerifyUserTypes extends Request {
  body: {
    token: String;
    userId: String;
  };
}
