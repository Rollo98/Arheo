const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../passport');
const { validateBody, schemas } = require('../utils/utils_validators');
const ArchController = require('../controllers/archeologist');
multer = require('multer'),
  upload = multer({
    storage: multer.diskStorage({
      destination: './uploads'
    })
  })

const passportJWT = passport.authenticate('jwt', { session: false });
router.route('/add')
  .post(passportJWT,upload.single('img'),
  validateBody(schemas.newArcheologistSchema), 
  ArchController.addArcheologist);

router.route('/get')
  .get(ArchController.getArcheologist)

// router.route('/') -> this doesn't work for some reason amazingly 
// .get((req, res, next)=>{res.status(200).end();})

router.route('/get/:firstName/:lastName')
  .get(ArchController.getArcheologist)
  .delete(passportJWT, ArchController.deleteArcheologist)
  .post(validateBody(schemas.updateArcheologistSchema), passportJWT, ArchController.updateArcheologist);

module.exports = router;