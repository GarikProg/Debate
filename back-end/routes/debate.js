import express from 'express';
import Debates from '../models/debate.js';
import Users from '../models/user.js'
const router = express.Router();


router
  .route('/loadall')
  .post(async (req, res) => {
    try {
      const debates = await Debate.find({}).exec();
      res.json({ debates })
    } catch (error) {
      return res.json({ loadedDebates: false, err: 'Data base error, plase try again' });
    }
});

router
  .route('/createnew')  
  .post(async (req, res) => {    
    const { creator, participant } = req.body
    const createdAt = Date.now();
    const voteAt = createdAt + 172800000;
    const closedAt = createdAt + 345600000;
    try {
      const debate = await Debate.create({
        creator,
        participant,
        createdAt,
        voteAt,
        closedAt
      });

      const oneParticipant = await Users.findById(creator);
      oneParticipant.debates.push(debate._id);      
      await oneParticipant.save();

      const twoParticipant = await Users.findById(participant);
      twoParticipant.debates.push(debate._id);
      await twoParticipant.save();

      debate.populate('creator').populate('participant').populate('theme').populate('commets')
      res.json({ successfulDebateCreate: true, debate });
    } catch (error) {
      res.json({ successfulDebateCreate: false, err: 'Data base error, plase try again' });
    }
    res.end();
});

router
  .route('/:id')
  .get(async (req, res) => {
    const debate = await Debates.findById(req.params.id).populate('participant').populate('creator').populate('comments'); 
    res.json(debate);
});

export default router;
