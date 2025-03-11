import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import doctorRoutes from './routes/doctor';
import appointmentRoutes from './routes/appointment';
import userRoutes from './routes/user';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const prisma = new PrismaClient();

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual URL of your admin dashboard
  optionsSuccessStatus: 200
};

// Middleware
app.use(bodyParser.json());

// Database connection
prisma.$connect().then(() => {
  console.log('Connected to the database');
}).catch((error) => {
  console.error('Database connection error:', error);
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
