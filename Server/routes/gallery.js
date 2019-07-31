const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");

const passportConf = require("../passport");
const GalleryController = require("../controllers/gallery");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads"
  })
});
const passportJWT = passport.authenticate("jwt", { session: false });

router
  .route("/add")
  .post(passportJWT, upload.any(), GalleryController.addGallery);
router.route("/get/:uid?").get(GalleryController.getGallery);
router.route("/edit/:uid").post(passportJWT, GalleryController.updateGallery);
router
  .route("/delete/:uid")
  .delete(passportJWT, GalleryController.deleteGallery);

module.exports = router;
