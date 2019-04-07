const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');

signToken = user => {
  return JWT.sign({
    iss: 'ArheoApp',
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET)
}

module.exports = {
  getUser: async (req, res, next) => {
    if (req.user.role.includes("admin")) {
      if ((req.params.userName === null) || (req.params.userName === undefined)) {
        const foundUsers = await User.find({});
        res.status(200).json({ foundUsers });
      } else {
        let foundUser = await User.find({ userName: req.params.userName });
        if (!foundUser) {
          foundUser = await User.find({ email: req.params.userName });
          if (!foundUser) {
            res.status(400).end();
          }
        }
        res.status(200).json({ foundUsers });
      }
    }
    //for all users wich don't have admin role return 400
    res.status(400).end();
  },
  deleteUser: async (req, res, next) => {
    if ((req.params.userName === null) || (req.params.userName === undefined)) {
      const user = req.user;
      await User.deleteOne({ user }).then(user => {
        if (!user) {
          return res.status(404).end();
        }
        return res.status(200).json("OK");
      }).catch(err => next(err))
    }
    if (req.user.role.includes("admin")) {
      let user = await User.find({ userName: req.params.userName });
      if (!user) {
        user = await User.find({ email: req.params.userName });
        if (!user) {
          res.status(400).end();
        }
      }
      await User.deleteOne(user)
        .then(user => {
          if (!user) {
            return res.status(400).end();
          }
          return res.status(200).end();
        }).catch(err => next(err))
    }
    res.status(400).end();
  },
  editUser: async (req, res, next) => {
    if ((req.params.userName === null) || (req.params.userName === undefined)) {
      const { userName, firstName, lastName, email, password } = req.body;
      await User.update(req.user, { userName, firstName, lastName, email, password })
        .then(newUser => {
          if (!newUser) {
            return res.status(400).end();
          }
          const token = signToken(newUser);
          return res.status(200).json({ token });
        }).catch(err => next(err))
    }
    if (req.user.role.includes("admin")) {
      let user = await User.find({ userName: req.params.userName });
      if (!user) {
        user = await User.find({ email: req.params.userName });
        if (!user) {
          res.status(400).end();
        }
      }
      const { userName, firstName, lastName, email, password, role } = req.body;
      await User.update(user, { userName, firstName, lastName, email, password, role })
        .then(newUser => {
          if (!newUser) {
            return res.status(400).end();
          }
          return res.status(200).end();
        }).catch(err => next(err))
    }
    //for all users wich don't have admin role return 400
    res.status(400).end();
  },

  signUp: async (req, res, next) => {
    const { userName, firstName, lastName, email, password } = req.value.body,
      role = ["user"]

    let foundUser = await User.findOne({ userName });
    if (foundUser) {
      return res.status(403).send("Username is in use.")
    }
    foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).send("Email is in use.")
    }
    const newUser = new User({ userName, firstName, lastName, email, password, role });
    await newUser.save();

    const token = signToken(newUser);
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  }
}