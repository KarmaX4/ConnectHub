import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-media-app';


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.get('/', (req, res) => {
  res.send('Social Media API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
