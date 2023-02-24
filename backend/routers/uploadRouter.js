import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg'
};

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const isValidMimeType = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValidMimeType) {
      error = null;
    }
    callback(error, 'uploads/');
  },
  filename(req, file, callback) {
    const fileExt = MIME_TYPE_MAP[file.mimetype];
    callback(null, `${Date.now()}.${fileExt}`);
  }
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;
