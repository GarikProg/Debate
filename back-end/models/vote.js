import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.USER,
  },
  debate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.DEBATE,
  },
  voteFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.USER,
  },
});

export default mongoose.model(process.env.VOTE, VoteSchema);
