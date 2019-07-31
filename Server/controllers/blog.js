const Blog = require("../models/blog");

module.exports = {
  addPost: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      let addDate = new Date();
      let author = req.user.userName;
      const { title, text, uid, url } = req.body;
      newPost = new Blog({ uid, title, text, addDate, author, url });
      await newPost
        .save()
        .then(doc => {
          if (!doc) {
            return res.status(404);
          }
          return res.status(200).json({ title, text, addDate, author, url });
        })
        .catch(err => next(err));
    }
  },
  getPosts: async (req, res, next) => {
    let query = {};
    if (req.params.uid !== undefined) query = { uid: req.params.uid };
    try {
      const posts = await Blog.find(query);
      res.status(200).json({ posts });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
    res.status(400);
  },

  deletePost: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      const { uid } = req.params;
      await Blog.deleteOne({ uid }, error => {
        if (error) {
          return res.status(500).json({ error });
        }
        return res.json({ response: "Success" });
      });
    }
  },
  updatePost: async (req, res, next) => {
    if (req.user.role.includes("writer") || req.user.role.includes("admin")) {
      const { uid } = req.params;
      const { title, text, url } = req.body;
      try {
        await Blog.findOneAndUpdate(
          { uid },
          {
            title,
            text,
            url
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
