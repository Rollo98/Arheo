const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");

const passportConf = require("../passport");
const { validateBody, schemas } = require("../utils/utils_validators");
const BlogController = require("../controllers/blog");

const passportJWT = passport.authenticate("jwt", { session: false });

router.route("/add").post(passportJWT, BlogController.addPost);
router
  .route("/get/:uid?")
  .get(BlogController.getPosts)
router.route("/edit/:uid")
  .post(passportJWT, BlogController.updatePost);
router
  .route("/delete/:uid")
  .delete(passportJWT, BlogController.deletePost);

module.exports = router;
