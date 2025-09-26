// POST /api/auth/register

// POST /api/auth/login

// POST /api/orders

// POST /api/orders/payhere/notify ✅ needed for PayHere

// GET /api/orders/:userId ✅ for user history



import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import userRoutes from './routes/register.js';
import authRoutes from './routes/login.js';
import orderRoutes from './routes/orders.js';
import payhereRoutes from "./routes/payhere.js";
import crypto from 'crypto';

dotenv.config();
const app = express();

//database connection
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/register", userRoutes);
app.use("/api/login",authRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/payhere", payhereRoutes);

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));







