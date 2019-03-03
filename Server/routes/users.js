const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../passport');
const { validateBody, schemas } = require('../utils/utils_validators');
const UsersController = require('../controllers/users');

const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/getUsers')
    .post(passportJWT, UsersController.getUsers);;

router.route('/signup')
    .post(validateBody(schemas.registerSchema), UsersController.signUp);

const passportSignIn = passport.authenticate('local', { session: false });
router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);
module.exports = router;