import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

function serializeUser(user) {
  return {
    id: user.id,
    username: user.name,    
  };
}

router.route('/').get((req, res) => {
  res.send('rabotaet')
});

router.route('/loading').post((req, res) => {
  if (req.session.user) {
    return res.json({ authenticated: true, user: req.session.user });
  } else {
    return res.json({ authenticated: false });
  }
});

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
            return res.json({ authenticated: false, err: 'No such user' });
          } else {
            const isValidPassword = await bcrypt.compare(password, userByEmail.password);
            if (!isValidPassword) {
              return res.json({ authenticated: false, err: 'Invalid password' });
            }
            req.session.user = serializeUser(userByEmail);
            return res.json({ authenticated: true, user: req.session.user });
          }
        } catch (error) {
          return res.json({ authenticated: false, err: 'Data base error, plase try again' });
        }
      } else {
        const isValidPassword = await bcrypt.compare(password, userByName.password);
        if (!isValidPassword) {
          return res.json({ authenticated: false, err: 'Invalid password' });
        } else {
          req.session.user = serializeUser(userByName);
          return res.json({ authenticated: true, user: req.session.user });
        }
      }
    } catch (error) {
      return res.json({ authenticated: false, err: 'Data base error, plase try again' });
    }
  });

router
  .route('/signup')
  .post(async (req, res) => {
    const { name, password, email } = req.body;
    try {
      const userByName = await User.findOne({ name }).exec();
      if (userByName) {
        return res.json({ authenticated: false, err: 'This name is already taken' });
      } else {
        try {
          const userByEmail = await User.findOne({ email }).exec();
          if (userByEmail) {
            return res.json({ authenticated: false, err: 'This email is already taken' });
          } else {
            const saltRounds = Number(process.env.SALT_ROUNDS ?? 10);
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await User.create({
                  name,
                  password: hashedPassword,
                  email,        
                });
            req.session.user = serializeUser(user);
            return res.json({ authenticated: true, user: req.session.user });
          }
        } catch (error) {
          return res.json({ authenticated: false, err: 'Data base error, plase try again' });
        }
      }
    } catch (error) {
      return res.json({ authenticated: false, err: 'Data base error, plase try again' });
    }
  });

router.route('/logout').post((req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ err: 'Session destroy error' })
    }
    res.clearCookie(req.app.get("session cookie name"), { path: '/' });
    return res.json({ authenticated: false });
  });
});

export default router;
