const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../passport');
const { validateBody, schemas } = require('../utils/utils_validators');
const ArchController = require('../controllers/archeologist');

const passportJWT = passport.authenticate('jwt', { session: false });
router.route('/add')
  .post(validateBody(schemas.newArcheologistSchema), passportJWT, ArchController.addArcheologist);

router.route('/get')
  .get(ArchController.getArcheologist)

// router.route('/') -> this doesn't work for some reason amazingly 
// .get((req, res, next)=>{res.status(200).end();})

router.route('/:firstName/:lastName')
  .get(ArchController.getArcheologist)
  .delete(passportJWT, ArchController.deleteArcheologist)
  .post(validateBody(schemas.updateArcheologistSchema), passportJWT, ArchController.updateArcheologist);

module.exports = router;