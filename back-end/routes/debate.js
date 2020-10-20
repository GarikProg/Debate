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
    res.end();
});

router
  .route('/:id')
  .post(async (req, res) => {
    res.end();
});

export default router;
