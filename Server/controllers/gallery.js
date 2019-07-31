const Gallery = require("../models/gallery");
const fs = require("fs");
const mongo = require("mongodb");

module.exports = {
  addGallery: async (req, res, next) => {
    if (req.user.role.includes("writer") || req.user.role.includes("admin")) {
      let arrids = [];
      for (let i = 0; i < req.files.length; i++) {
        let fullpath = "";
        if (req.files[i] !== null && req.files[i] !== undefined) {
          const oldPath = `./${req.files[i].path}`,
            newPath = `./${req.files[i].path}_${req.files[i].originalname}`;
          fs.renameSync(oldPath, newPath);
          fullpath = newPath.replace(".", "");
        }
        const { arheologist, text } = req.body;
        newEntry = new Gallery({ arheologist, photo: fullpath, text });
        try {
          await newEntry.save();
        } catch (err) {
          console.log(err);
          return res.status(500).json({ err });
        }
        arrids.push({ id: newEntry._id });
      }
      return res.status(200).json({ ids: arrids });
    }
    return res.status(400);
  },

  getGallery: async (req, res, next) => {
    let query = {};
    let posts;
    if (req.params.uid !== undefined)
      query = { arheologist: new mongo.ObjectId(req.params.uid) };
    try {
      posts = await Gallery.find(query);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
    return res.status(200).json({ posts });
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
