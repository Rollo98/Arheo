const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../passport');
const { validateBody, schemas } = require('../utils/utils_validators');
const UsersController = require('../controllers/users');

const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/:userName?')
  .get(passportJWT, UsersController.getUser)
  .delete(passportJWT, UsersController.deleteUser);

router.route('/:userName/edit', '/edit')
  .post(passportJWT, UsersController.editUser);

router.route('/signup')
  .post(validateBody(schemas.registerSchema), UsersController.signUp);

const passportSignIn = passport.authenticate('local', { session: false });
router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);
module.exports = router;