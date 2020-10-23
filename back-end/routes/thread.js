import express from "express";
import Thread from "../models/thread.js";
import Comments from "../models/comment.js";
import Users from '../models/user.js'

const router = express.Router();


router
  .route('/createnew')
  .post(async (req, res) => {
    const { theme, sideTwo, sideOne, description, creator } = req.body;
    const date = Date.now();
    try {
      const thread = await Thread.create({
        creator,
        theme,
        description,
        sideOne,
        sideTwo,
        createdAt: date,
        updatedAt: date,
        comments: [],
      });
      
      const user = await Users.findById(creator);
      user.threads.push(thread._id);
      await user.save();
      res.json({ successfulThreadCrate: true, thread });
    } catch (error) {
      res.json({ successfulThreadCreate: false, err: 'Data base error, plase try again' });
    }
})

router
  .route('/loadall')
  .post(async (req, res) => {
    try {
      const threads = await Thread.find({}).populate({
        path: 'comments',
        populate: {
          path: 'creator'
        }
      })
      .populate('threadWinner')
      .populate('creator')
      .exec();

      res.json({ loadedThreads: true, threads });
    } catch (error) {
      return res.json({ loadedThreads: false, err: 'Data base error, plase try again' });
    }

});

router.route("/loadall").post(async (req, res) => {
  try {
    const threads = await Thread.find({})
      .populate("comments")
      .populate("threadWinner")
      .populate("creator")
      .exec();
    res.json({ loadedThreads: true, threads });
  } catch (error) {
    return res.json({
      loadedThreads: false,
      err: "Data base error, plase try again",
    });
  }
});

router.route("/:id").get(async (req, res) => {
  const thread = await Thread.findById(req.params.id)
    .populate({
      path: 'comments',
      populate: {
        path: 'creator'
      }
    })
    .populate("threadWinner")
    .populate("creator")    
    .exec();
  res.json({ thread });
});

export default router;
