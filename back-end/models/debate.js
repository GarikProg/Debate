import mongoose from 'mongoose'

const DebateSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.USER,
  },
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.USER,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.COMMENT,
  }],
  createdAt: Date,
  voteAt: Date,
  closedAt: Date,
  debateWinner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.USER,
  },
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.VOTE,
  }]
});

export default mongoose.model(process.env.DEBATE, DebateSchema)
