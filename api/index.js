import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import bcrypt from "bcryptjs";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from './routes/listing.route.js';

dotenv.config();


const app = express();

app.use(express.json());
app.use(cookieParser());
const crs = cors();

app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,  
}));


//database connection 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!:->' + mongoose.connection.host);
  })
  .catch((err) => {
    console.log(err);
    console.log('Failed to connect to MongoDB');
  });

//check the backend project run this port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`sever is running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Hello, world!');
});





app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing',listingRouter);

app.use((err, req, res,next ) => {
  console.error(err.stack);
              
  const statusCode = err.status || 500;
  const message = err.message || 'Something went wrong';

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
});


