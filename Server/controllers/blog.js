const Blog = require("../models/blog");
const fs = require("fs");

module.exports = {
  addPost: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      let addDate = new Date();
      let author = req.user.userName;
      const { title, text } = req.body;
      if (
        title !== undefined ||
        title !== null ||
        text !== undefined ||
        text !== null
      ) {
        newPost = new Blog({ title, text, addDate, author });
      }
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
  getPosts: async (req, res, next) => {
    if (
      req.params.title === null ||
      req.params.title === undefined ||
      (req.params.text === null || req.params.text === undefined)
    ) {
      const posts = await Blog.find(
        {},
        { title: 1, text: 1, author: 1, addDate: 1 }
      );
      if (!posts) {
        res.status(500);
      }
      res.status(200).json({ posts });
    } else {
      const { title, text } = req.params;
      const posts = await Blog.find({ title, text, author, addDate });
      res.status(200).json({ posts });
    }
    res.status(400);
  },
  deletePost: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      const { title, text } = req.params;
      await Blog.deleteOne({ title, text }, error => {
        if (error) {
          return res.status(500).json({ error });
        }
        return res.json({ title, text, response: "Success" });
      });
    }
  },
  updatePost: async (req, res, next) => {
    //     if (req.user.role.includes("writer") || req.user.role.includes("admin")) {
    //       if (
    //         req.params.title === null ||
    //         req.params.title === undefined ||
    //         (req.params.text === null || req.params.text === undefined)
    //       ) {
    //         const { old_title, old_text } = req.body;
    //         oldPost = new Blog({
    //           old_title,
    //           old_text
    //         });
    //         const { title, text } = req.body;
    //         await Archeologist.update(oldPost, {
    //           title,
    //           text
    //         })
    //           .then(ret => {
    //             if (!ret) {
    //               return res.status(400);
    //             }
    //             return res.status(200);
    //           })
    //           .catch(err => next(err));
    //       }
    //     }
    //     res.status(400);
  }
};
