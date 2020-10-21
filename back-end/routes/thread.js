import express from "express";
import Thread from "../models/thread.js";
import Comments from "../models/comment.js";

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
      })
      res.json({ successfulThreadCrate: true, thread });
    } catch (error) {
      res.json({ successfulThreadCrate: false, err: 'Data base error, plase try again' });
    }
})

router
  .route('/loadall')
  .post(async (req, res) => {
    try {
      const threads = await Thread.find({}).populate('comments').populate('threadWinner').populate('creator').exec();
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
    .populate("comments")
    .populate("threadWinner")
    .populate("creator")    
    .exec();
  const comments = await Comments.find({ commentLocation: req.params.id }).populate("likes");
  res.json({ thread, comments});
});

export default router;
