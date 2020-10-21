import express from 'express';
import Debate from '../models/debate.js';
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
  .route('createnew')
  .post(async (req, res) => {
    const { creator, participant } = req.body
    const createdAt = Date.now();
    const voteAt = createdAt + 172800;
    const closedAt = createdAt + 345600;
    try {
      const debate = await Debate.create({
        creator,
        participant,
        createdAt,
        voteAt,
        closedAt
      });
      res.json({ successfulDebateCreate: true, debate });
    } catch (error) {
      res.json({ successfulDebateCreate: false, err: 'Data base error, plase try again' });
    }
    res.end();
});

router
  .route('/:id')
  .post(async (req, res) => {
    res.end();
});

export default router;
