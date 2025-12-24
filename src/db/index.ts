import mongoose from "mongoose";
import { MONGOURL } from "src/utils/variables";

//database connection
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Connected to databse");
  })
  .catch((err) => {
    console.log("Error connecting to databse");
    console.log(err);
  });
