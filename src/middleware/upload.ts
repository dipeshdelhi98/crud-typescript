import multer from 'multer';

// Set up Multer storage
const storage = multer.diskStorage({
  destination: 'src/uploads/', // Choose your upload destination
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
