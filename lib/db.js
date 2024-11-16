// lib/db.js
import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('mongoose.connections[0].readyState =>', mongoose.connections[0].readyState);
      return;  
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  }
  
  catch (error) {  
    console.log('Error connecting to MongoDB:', e.message);
  }
};

export default connectMongo;