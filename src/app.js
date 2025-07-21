import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv/config';
import connectDB from './connection/db.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import careersRoutes from './routes/careers.routes.js';

connectDB();
const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies




app.use('/api', authRoutes);
app.use('/api', careersRoutes);

export default app;  //Se va a poner todo para que se inicialice el servidor en el index.js
