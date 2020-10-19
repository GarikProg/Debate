import express from 'express';
import session from 'express-session';
import './misc/env.js';
import './misc/db.js';
import authRouter from './routes/auth.js';
import MongoDB from 'connect-mongodb-session';
import ws from 'ws';
import threadRouter from './routes/thread.js'
import cors from "cors";
import ioSocket from "socket.io";
const io = ioSocket();

const logger = console;
const app = express();
const MongoDBStore = MongoDB(session);
const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});

io.on("connection", (socket) => {
    socket.join(socket.handshake.query.id) 
  socket.on("message", (data) => {      
    io.to(data.id).emit('broadcast', data.input);
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

app.use(session({
  name: app.get('session cookie name'),
  secret: process.env.SESSION_SECRET,
  store: store,
  // Если true, сохраняет сессию, даже если она не поменялась
  resave: false,
  // Если false, куки появляются только при установке req.session
  saveUninitialized: false,
  cookie: {
    // В продакшне нужно "secure: true" для HTTPS
    // secure: process.env.NODE_ENV === 'production',
    secure: false
  },
}));

app.use(authRouter);
app.use('/thread', threadRouter)

const port = process.env.PORT ?? 3001;
const httpServer = app.listen(port, () => {
  logger.log('Сервер запущен. Порт:', port);
});

const wsServer = new ws.Server({
  server: httpServer,
});

wsServer.on('connection', (client) => {
  client.on('message', (message) => {
    console.log('>>>>message', message);
    const obj = JSON.parse(message);
    wsServer.clients.forEach((client) => {
      clien.send(newMessage);
    })
  }
  )
});
