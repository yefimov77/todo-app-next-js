import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Connected');
    });
  } catch (err) {
    console.log(err);
  }
}