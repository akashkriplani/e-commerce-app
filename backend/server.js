import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';

const app = express();

dotenv.config();

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to db.'))
  .catch(() => console.log('Error in connecting to db.'));

app.use('/api/users', userRouter);

app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.send('Server is ready!');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`);
});
