import mongoose from "mongoose";

const databseUrl = process.env.MANGO_URI as string;
//database connection
mongoose
  .connect(databseUrl)
  .then(() => {
    console.log("Connected to databse");
  })
  .catch((err) => {
    console.log("Error connecting to databse");
    console.log(err);
  });
