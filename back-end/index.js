import express from "express";
import session from "express-session";
import "./misc/env.js";
import "./misc/db.js";
import authRouter from "./routes/auth.js";
import debateRouter from './routes/debate.js'
import MongoDB from "connect-mongodb-session";
import threadRouter from "./routes/thread.js";
import profileRouter from './routes/profile.js'
import cors from "cors";
import ioSocket from "socket.io";
const io = ioSocket();
import Comments from "./models/comment.js";
import Likes from "./models/like.js"
import Threads from './models/thread.js'
import User from './models/user.js'
import Debates from './models/debate.js'


const logger = console;
const app = express();
const MongoDBStore = MongoDB(session);
const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});

io.on("connection", (socket) => {
  socket.nickname = socket.handshake.query.nickname;
  const roomID = socket.handshake.query.id;
  socket.join(roomID);
  socket.on("message", async (data) => {
    if(data.type === "comment") {      
    const { text, creator,  id, side, nickName, from } = data;
    try {

      const comment = await Comments.create({
        creator,
        text,
        commentLocation: id,
        side,
        nickName,
      });      
      const threads = await Threads.findById(id)
      threads.comments.push(comment._id)
      await threads.save();

      const user = await User.findById(creator);      
      user.comments.push(comment._id)
      await user.save();
      comment.populate('creator').populate('likes').populate('commentLocation')

      if (data.from === "thread") {
      const thread = await Threads.findById(id)
      thread.comments.push(comment._id)
      await thread.save();
      }

      if (data.from === "debate") {
        console.log(id);
        const debate = await Debates.findById(id)
        debate.comments.push(comment._id)
        await debate.save();
      }   

      io.to(data.id).emit("broadcast", comment);
    } catch (error) {
      console.log(error);
    }
  }
  if(data.type === "like") {    
    const { comment_id, creator} = data;
    try {
      const like = await Likes.create({
        creator,
        comment: comment_id,        
      });
      const comment = await Comments.findById(comment_id);
      comment.likes.push(like._id)
      await comment.save();
      const ratingUser = await User.findById(comment.creator);
      ratingUser.rating += 1;
      await ratingUser.save();
      const user = await User.findById(creator);      
      user.likes.push(like._id)
      await user.save();
      like.populate('creator').populate('comment');  
      io.to(data.id).emit("broadcast", like);
    } catch (error) {
      console.log(error);
    }
  }
  });
});

io.listen(process.env.PORT_SOCKET);
console.log("listening on port ", process.env.PORT_SOCKET);

// Запоминаем название куки для сессий
app.set("session cookie name", "sid");
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: app.get("session cookie name"),
    secret: process.env.SESSION_SECRET,
    store: store,
    // Если true, сохраняет сессию, даже если она не поменялась
    resave: false,
    // Если false, куки появляются только при установке req.session
    saveUninitialized: false,
    cookie: {
      // В продакшне нужно "secure: true" для HTTPS
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
    },
  })
);

app.use(authRouter);
app.use('/debate', debateRouter);
app.use('/thread', threadRouter);
app.use('profile', profileRouter);

const port = process.env.PORT ?? 3001;
const httpServer = app.listen(port, () => {
  logger.log("Сервер запущен. Порт:", port);
});
