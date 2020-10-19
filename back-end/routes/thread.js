import express from 'express'
import Thread from '../models/thread.js'

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
  console.log('lllllll');
  const threads = await Thread.find();
  res.json({threads}) 
})

export default router;






