const Post = require("../model/Post");

 exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("createdBy", "name email")  
      .populate("comments.sentBy", "name email")  
      .populate("comments.liked", "name email"); 

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { _id } = req.user; 
    const { message } = req.body;
    console.log(req.body,'the message is')

    const newPost = new Post({
      createdBy: _id,
      message,
      createdAt: new Date(),
    });

    await newPost.save();

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

     const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.createdBy.toString() !== req.user._id.toString()) {
     return res.status(403).json({
       success: false,
       message: "Not authorized to update this post",
     });
   }

     await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};


// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
  
    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this post",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { message, updatedAt: new Date() },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
