import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/auth.routes.js';
import eventsRoutes from './routes/events.routes.js';
import colors from 'colors';
import { errorHandler, notFound } from './middlewares/error.middleware.js';
import connectDB from './config/db.config.js';
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
// //middlewares
app.use(cors({ origin: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/events', eventsRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  connectDB(), console.log(`Server started on port ${port}`.red);
});
