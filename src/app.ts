import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import blogRoutes from './routes//blogRoutes';
import downloadRoutes from './routes/downloadRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://dipesh:dipesh123@cluster0.9gwkj.mongodb.net/p';

mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogRoutes);
app.use('/download', downloadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
