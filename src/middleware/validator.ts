import { RequestHandler } from "express";
import { error } from "node:console";
import * as yup from "yup";

export const validate = (schema: any): RequestHandler => {
  return async (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        error: "No body found",
      });
    }
    try {
      const schemaTovalidate = yup.object({
        body: schema,
      });
      await schemaTovalidate.validate(
        {
          body: req.body,
        },
        {
          abortEarly: true,
        }
      );
      next();
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        return res.status(400).json({
          error: e.message,
        });
      } else {
        return res.status(500).json({
          error: "Internal Server Validation Error",
        });
      }
    }
  };
};
