const express = require("express");
const { getPosts, deletePost, createPost, updatePost } = require("../controller/Post");
const auth = require("../middleware/Auth");
const postRouter = express.Router();

postRouter.get("/posts",  auth,getPosts);
postRouter.delete("/deletepost/:id", auth, deletePost);
postRouter.post("/createpost", auth, createPost);
postRouter.put("/updatepost/:id",auth,  updatePost);

module.exports = postRouter;
