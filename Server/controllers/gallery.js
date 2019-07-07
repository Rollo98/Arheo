const Gallery = require("../models/gallery");
const fs = require("fs");
const mongo = require("mongodb");

module.exports = {
  addGallery: async (req, res, next) => {
    if (req.user.role.includes("writer") || req.user.role.includes("admin")) {
      for (let i = 0; i < req.files.length; i++) {
        let fullpath = "";
        if (req.files[i] !== null && req.files[i] !== undefined) {
          const oldPath = `./${req.files[i].path}`,
            newPath = `./${req.files[i].path}_${req.files[i].originalname}`;
          fs.renameSync(oldPath, newPath);
          fullpath = newPath.replace(".", "");
        }
        try {
          const { arheologist, text } = req.body;
          newEntry = new Gallery({ arheologist, photo: fullpath, text });
          await newEntry.save();
        } catch (err) {
          console.log(err);
          return res.status(500).json({ err });
        }
        return res.status(200).json({ id: newEntry._id });
      }
    }
    return res.status(400);
  },
  getGallery: async (req, res, next) => {
    let query = {};
    if (req.params._id !== undefined) query = { _id: req.params._id };
    try {
      const posts = await Gallery.find(query);
      res.status(200).json({ posts });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
    res.status(400);
  },

  deleteGallery: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      const { uid } = req.params;
      console.log(uid);
      await Gallery.deleteOne({ _id: new mongo.ObjectId(uid) }, error => {
        if (error) {
          return res.status(500).json({ error });
        }
        return res.json({ response: "Success" });
      });
    }
  },

  updateGallery: async (req, res, next) => {
    if (req.user.role.includes("writer") || req.user.role.includes("admin")) {
      const { uid } = req.params;
      const { photo, text } = req.body;
      console.log(photo, text);
      try {
        await Gallery.findOneAndUpdate(
          { _id: new mongo.ObjectId(uid) },
          {
            uid,
            photo,
            text
          }
        );
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error });
      }
      return res.json({ response: "Success" });
    }
    res.status(400);
  }
};
