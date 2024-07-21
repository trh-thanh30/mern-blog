import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deletePost, getPosts } from "../controllers/post.controller.js";
const route = express.Router();
route.post("/create", verifyToken, create);
route.get("/getposts", getPosts);
route.delete("/deletepost/:postId/:userId", verifyToken, deletePost);
export default route;
