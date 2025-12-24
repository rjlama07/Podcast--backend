import express from "express";

import "dotenv/config";
import "./db";
import AuthRouter from "./routers/AuthRouter";

const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("auth", AuthRouter);

app.listen(8080, () => {
  console.log("port running on 80808");
});
