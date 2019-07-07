const Gallery = require("../models/gallery");

module.exports = {
  addGallery: async (req, res, next) => {
    if (req.user.role.includes("writer") || req.user.role.includes("admin")) {
      let fullpath = "";
      if (req.files[0] !== null && req.files[0] !== undefined) {
        const oldPath = `./${req.files[0].path}`,
          newPath = `./${req.files[0].path}_${req.files[0].originalname}`;
        fs.renameSync(oldPath, newPath);
        fullpath = newPath.replace(".", "");
      }
      const { arheologist } = req.body;
      newPost = new Gallery({ arheologist, photo: fullpath });
      await newPost
        .save()
        .then(doc => {
          if (!doc) {
            return res.status(404);
          }
          return res.status(200).json({ title, text, addDate, author });
        })
        .catch(err => next(err));
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
      const { title, text } = req.body;
      try {
        await Gallery.findOneAndUpdate({ uid }, {
          title,
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
