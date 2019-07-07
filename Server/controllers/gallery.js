const Gallery = require("../models/gallery");

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
        const { arheologist, text } = req.body;
        newEntry = new Gallery({ arheologist, photo: fullpath, text });
        await newEntry
          .save()
          .then(doc => {
            if (!doc) {
              return res.status(404);
            }
            return res.status(200).json({ id: newEntry._id });
          })
          .catch(err => next(err));
      }
    }
  },
  getGallery: async (req, res, next) => {
    let query = {}
    if (req.params.uid !== undefined)
      query = { uid: req.params.uid }
    try {
      const posts = await Gallery.find(query);
      res.status(200).json({ posts });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err });
    }
    res.status(400);
  },

  deleteGallery: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      const { uid } = req.params;
      await Gallery.deleteOne({ uid }, error => {
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
      try {
        await Gallery.findOneAndUpdate({ uid }, {
          uid,
          photo,
          text
        })
      } catch (err) {
        console.log(err)
        return res.status(500).json({ error });
      }
      return res.json({ response: "Success" });
    }
    res.status(400);
  }
};
