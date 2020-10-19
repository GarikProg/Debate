import express from 'express'
import Thread from '../models/thread.js'
import Comments from '../models/comment.js'

const router = express.Router();

router.route('/')
.post(async (req, res) => {
  
  const { theme, description, sideOne, sideTwo} = req.body;
console.log("<<<<<<<<<", req.body);
  const creator = 'user' //req.session.id
  const createdAt =  Date.now()
  try {
    await Thread.create({
      // creator,
      theme,
      description,
      sideOne,
      sideTwo,
      createdAt,
    })
    res.end()
  } catch (error) {
    res.json(error)
  }
})

.get(async (req, res) => {  
  const threads = await Thread.find();
  res.json({threads}) 
})


router.route('/:id')
.get(async (req, res) => {  
  const thread = await Thread.findById(req.params.id);
  const comments = await Comments.find({commentLocation: req.params.id}) 
  res.json({thread, comments}) 
})


export default router;






