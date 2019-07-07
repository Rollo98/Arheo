const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");

const passportConf = require("../passport");
const { validateBody, schemas } = require("../utils/utils_validators");
const GalleryController = require("../controllers/blog");

const passportJWT = passport.authenticate("jwt", { session: false });

router.route("/add").post(passportJWT, GalleryController.addPost);
router
  .route("/get/:uid?")
  .get(GalleryController.getPosts)
router.route("/edit/:uid")
  .post(passportJWT, GalleryController.updatePost);
router
  .route("/delete/:uid")
  .delete(passportJWT, GalleryController.deletePost);

module.exports = router;
