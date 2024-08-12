 const express = require("express");
  const auth = require("../middleware/Auth");
const { getUsers, deleteUser, updateUser, register } = require("../controller/User");
 const userRouter = express.Router();

userRouter.get("/users",auth, getUsers);
userRouter.delete("/deleteUser/",auth, deleteUser );
userRouter.post("/createUser",register);
userRouter.put("/updateUser/",auth,  updateUser);

module.exports = userRouter;

