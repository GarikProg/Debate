import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.DB_USER,
  },
  text: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: process.env.LIKE,
    },
  ],
  commentLocation: mongoose.Schema.Types.ObjectId,
  isDebate: Boolean,
  side: String,
  nickName: String,
});

export default mongoose.model(process.env.COMMENT, CommentSchema);
