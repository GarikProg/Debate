import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.DB_USER,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.COMMENT,
  },
});

export default mongoose.model(process.env.LIKE, LikeSchema);
