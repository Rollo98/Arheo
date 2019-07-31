const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");

const passportConf = require("../passport");
const { validateBody, schemas } = require("../utils/utils_validators");
const ArchController = require("../controllers/archeologist");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads"
  })
});
const passportJWT = passport.authenticate("jwt", { session: false });
router.route("/add").post(passportJWT, upload.any(), ArchController.addArcheologist);

router.route("/get").get(ArchController.getArcheologist);

router.route("/:prenume/:numeDeFamilie/delete").delete(passportJWT, ArchController.deleteArcheologist);

router.route("/get").get(ArchController.getArcheologist)

router
  .route("/update")
  .post(
    // validateBody(schemas.updateArcheologistSchema),
    passportJWT,
    upload.any(),
    ArchController.updateArcheologist
  );

module.exports = router;
