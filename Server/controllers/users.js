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

getUser = function (email) {
    return User.findOne({ email });
}

module.exports = {
    getUsers:async (req, res, next) => {
      const foundUsers = await User.find({});
      res.status(200).json({ foundUsers });
    },

    signUp: async (req, res, next) => {
        const { firstName, lastName, email, password } = req.value.body;

        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).send("Email is in use.")
        }
        //Create New User
        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();

        const token = signToken(newUser);
        res.status(200).json({ token });
    },

    signIn: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    }
}