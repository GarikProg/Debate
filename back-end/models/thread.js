import mongoose from 'mongoose';

const ThreadSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.DB_USER,
  },
  theme: String,
  description: String,
  sideOne: String,
  sideTwo: String,
  sideOneCount: Number,
  sideTwoCount: Number,
  neutralSideCount: Number,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.COMMENT,
  }],
  createdAt: Date,
  updatedAt: Date,
  debatedAt: Date,
  threadWinner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.DB_USER,
  },
});

export default mongoose.model(process.env.THREAD, ThreadSchema)
