const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const bcrypt = require('bcryptjs');

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
        // foundUsers=foundUsers.reduce((acc,current)=>{
        // acc.push(current.userName)
        // },[]) 
        // don't send all the data like we do now wtf is wrong w me
        return res.status(200).json({ foundUsers });
      } else {
        let foundUser = await User.find({ userName: req.params.userName });
        if (!foundUser) {
          foundUser = await User.find({ email: req.params.userName });
          if (!foundUser) {
            return res.status(400)
          }
        }
        return res.status(200).json({ foundUser });
      }
    } else if (req.user !== null) {
      return res.status(200).json({ foundUser: req.user });
    }
    return res.status(400)
  },
  deleteUser: async (req, res, next) => {
    if ((req.params.userName === null) || (req.params.userName === undefined)) {
      let { ok, deletedCount } = await User.deleteOne({ userName: req.user.userName }).catch(err => next(err))
      if ((ok === 1) && (deletedCount === 1)) {
        res.status(200)
      }
    }
    if (req.user.role.includes("admin")) {
      let user = await User.find({ userName: req.params.userName });
      if (!user) {
        return res.status(400)
      }
      await User.deleteOne({ userName: req.params.userName }, (err) => {
        if (error) {
          logger.error(error)
          return res.status(500).json({ error })
        }
        return res.json({ error: null })
      })
    }
  },

  editUser: async (req, res, next) => {
    if ((req.params.userName === null) || (req.params.userName === undefined)) {
      const { prenume, numeDeFamilie, email } = req.body;
      let { password } = req.body
      let newVals
      if (password === "") {
        newVals = { userName: user[0].userName, prenume, numeDeFamilie, email, role }
      } else {
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(password, salt);
        password = passHash;
        newVals = { userName: user[0].userName, prenume, numeDeFamilie, email, password, role }
      }
      await User.update({ userName: user[0].userName }, newVals)
        .then(newUser => {
          if (!newUser) {
            return res.status(400)
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
          return res.status(400)
        }
      }
      const { prenume, numeDeFamilie, email, role } = req.body;
      let { password } = req.body
      let newVals
      if (password === "") {
        newVals = { userName: user[0].userName, prenume, numeDeFamilie, email, role }
      } else {
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(password, salt);
        password = passHash;
        newVals = { userName: user[0].userName, prenume, numeDeFamilie, email, password, role }
      }
      await User.update({ userName: user[0].userName }, newVals)
        .then(newUser => {
          if (!newUser) {
            return res.status(400)
          }
          return res.status(200)
        }).catch(err => next(err))
    }
    return res.status(400)
  },

  signUp: async (req, res, next) => {
    const { userName, prenume, numeDeFamilie, email, password } = req.value.body,
      role = ["user"]

    let foundUser = await User.findOne({ userName });
    if (foundUser) {
      return res.status(403).send("Username is in use.")
    }
    foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).send("Email is in use.")
    }
    const newUser = new User({ userName, prenume, numeDeFamilie, email, password, role });
    await newUser.save();

    const token = signToken(newUser);
    return res.status(200).json({ token, role: newUser.role });
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    return res.status(200).json({ token, role: req.user.role });
  }
}