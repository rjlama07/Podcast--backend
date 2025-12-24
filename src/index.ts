import express from "express";

import "dotenv/config";
import "./db";

const app = express();

app.listen(8080, () => {
  console.log("port running on 80808");
});
