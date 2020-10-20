import express from 'express'
import Thread from '../models/thread.js'
import Comments from '../models/comment.js'

const router = express.Router();

router
  .route('/createnew')
  .post(async (req, res) => {
    try {
      await Thread.create(req.body)
      res.end();
    } catch (error) {
      res.json(error);
    }
})

router
  .route('/loadall')
  .post(async (req, res) => {
    try {
      const threads = await Thread.find({}).populate('comments').populate('threadWinner').populate('creator').exec();
      console.log(threads);
      res.json({ loadedThreads: true, threads });
    } catch (error) {
      return res.json({ loadedThreads: false, err: 'Data base error, plase try again' });
    }
});

router
  .route('/:id')
  .get(async (req, res) => {  
    const thread = await Thread.findById(req.params.id).populate('comments').populate('threadWinner').populate('creator').exec();
    const comments = await Comments.find({commentLocation: req.params.id});
    res.json({thread, comments});
})


export default router;
