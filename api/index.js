import express from "express";
import  dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";

dotenv.config();


const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!:->'+mongoose.connection.host);
  })
  .catch((err) => {
    console.log(err);
    console.log('Failed to connect to MongoDB');
});

const PORT =    process.env.PORT||3000;
  app.listen(PORT, () => {
  console.log(`sever is running on port ${PORT}`);
});



app.use("/api/users", userRouter);
