import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();


/**
 * Подготавливает пользователя для записи в сессию
 * Мы не хотим хранить пароль в сессии, поэтому извлекаем только нужные данные
 * @param {object} user Объект пользователя из БД
 */
function serializeUser(user) {
  return {
    id: user.id,
    username: user.name,    
  };
}

router.route('/').get((req, res) => {
  res.send('rabotaet')
})

router
  .route('/signin')
  .post(async (req, res) => {
    const { nameEmail, password } = req.body;
    try {
      const userByName = await User.findOne({ name: nameEmail }).exec();
      if (!userByName) {
        try {
          const userByEmail = await User.findOne({ email: nameEmail }).exec();
          if (!userByEmail) {
            return res.json({ err: 'No such user' });
          } else {
            const isValidPassword = await bcrypt.compare(password, userByEmail.password);
            if (!isValidPassword) {
              return res.json({ err: 'Invalid password' });
            }
            req.session.user = serializeUser(user);
            return res.json({ authenticated: true});
          }
        } catch (error) {
          return res.json({ err: 'Data base error, plase try again' });
        }
      } else {
        const isValidPassword = await bcrypt.compare(password, userByName.password);
        if (!isValidPassword) {
          return res.json({ err: 'Invalid password' });
        }
        req.session.user = serializeUser(user);
        return res.json({ authenticated: true });
      }
    } catch (error) {
      return res.json({ err: 'Data base error, plase try again' });
    }
  });

router
  .route('/signup')
  .post(async (req, res) => {
    const { name, password, email } = req.body;
    try {
      const userByName = await User.findOne({ name }).exec();
      if (userByName) {
        return res.json({ err: 'This name is already taken' });
      } else {
        try {
          const userByEmail = await User.findOne({ email }).exec();
          if (userByEmail) {
            return res.json({ err: 'This email is already taken' });
          } else {
            const saltRounds = Number(process.env.SALT_ROUNDS ?? 10);
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await User.create({
                  name,
                  password: hashedPassword,
                  email,        
                });
            req.session.user = serializeUser(user);
            return res.json({ authenticated: true });
          }
        } catch (error) {
          return res.json({ err: 'Data base error, plase try again' });
        }
      }
    } catch (error) {
      return res.json({ err: 'Data base error, plase try again' });
    }
  });

router.get('/signout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie(req.app.get('session cookie name'));
    return res.json({ authenticated: false });
  });
});

export default router;
