import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    match: /^[A-Z]\w+$/i,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  password: String,
  rating: Number,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.COMMENT,
  }],
  threads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.THREAD,
  }],
  debates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.DEBATE,
  }],
  wonThreads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.THREAD,
  }],
  wonDebates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.DEBATE,
  }],
  votedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.VOTE,
  }],
});


export default mongoose.model(process.env.DB_USER, UserSchema);

