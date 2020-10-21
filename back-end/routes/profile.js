import express from "express";
import Users from '../models/user.js'

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    console.log(req.session.user.id); 
  })


export default router;
