import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.DB_USER,
  },
  debate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.DEBATE,
  },
  voteFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: process.env.DB_USER,
  },
});

// const vote = mongoose.model(process.env.VOTE, VoteSchema);

// async function create() {
//   await vote.create({ creator: '5f8d8352cbca0594d6ed6ea6', debate: '5f8ee720d1511a2d45837d18', voteFor: '5f8d8352cbca0594d6ed6ea6'})
//   console.log('okk')
// }

// create();

export default mongoose.model(process.env.VOTE, VoteSchema);
