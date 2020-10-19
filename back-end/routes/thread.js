import express from 'express'
import Thread from '../models/thread.js'

const router = express.Router();

router.post('/', (req, res) => {
  
  const { theme, description, sideOne, sideTwo} = req.body;
console.log("<<<<<<<<<", req.body);
  const creator = 'user' //req.session.id
  const createdAt =  Date.now()
  try {
    Thread.create({
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

export default router;






