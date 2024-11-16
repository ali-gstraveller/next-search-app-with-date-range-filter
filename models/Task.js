// models/Task.js

import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true, // make it required if every item should have a category
  },
  price: {
    type: Number,
    required: true, // make it required if every item should have a price
    min: 0, // optional, ensures price is not negative
  },
  createdAt: { type: Date },
  
  rating:{ 
    type: Number
  }



});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
