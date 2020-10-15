import express from 'express';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import './misc/env.js';
import './misc/db.js';
import authRouter from './routes/auth.js';
import userMiddleware from './middlewares/user.js';
import notFoundMiddleware from './middlewares/notfound.js';
import errorMiddleware from './middlewares/error.js';
import MongoDB from 'connect-mongodb-session'

const logger = console;
const app = express();
const MongoDBStore = MongoDB(session);
const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: 'sessions'
});

// Запоминаем название куки для сессий
app.set('session cookie name', 'sid');

app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: app.get('session cookie name'),
  secret: process.env.SESSION_SECRET,
  store: store,
  // Если true, сохраняет сессию, даже если она не поменялась
  resave: false,
  // Если false, куки появляются только при установке req.session
  saveUninitialized: true,
  cookie: {
    // В продакшне нужно "secure: true" для HTTPS
    secure: process.env.NODE_ENV === 'production',
  },
}));
app.use(userMiddleware);
app.use(authRouter);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  logger.log('Сервер запущен. Порт:', port);
});
