import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import blogRoutes from './routes//blogRoutes';
import downloadRoutes from './routes/downloadRoutes';
import fs from 'fs';
import csvtojson from 'csvtojson';
import multer from 'multer';
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://dipesh:dipesh123@cluster0.9gwkj.mongodb.net/p';

const upload = multer({ dest: 'uploads/' });

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

app.post('/upload/csv', upload.single('csvFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No CSV file uploaded' });
  }

  const csvFilePath = req.file.path;
  const jsonData = await csvtojson().fromFile(csvFilePath);

  const jsonFileName = 'output.json';

  fs.writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2));

  return res.status(200).json({ message: 'CSV file converted and saved as JSON' });
});
app.post('/upload/base64', (req, res) => {
  const { base64Data, fileName } = req.body;

  if (!base64Data || !fileName) {
    return res.status(400).json({ message: 'Missing base64Data or fileName' });
  }

  try {
   
    const fileBuffer = Buffer.from(base64Data, 'base64');


    fs.writeFileSync(`./${fileName}`, fileBuffer);

    return res.status(200).json({ message: 'File saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
