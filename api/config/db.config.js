import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.bold.underline
    );
  } catch (error) {
    console.log(error?.red?.bold?.underline);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected!');
});

export default connectDB;
