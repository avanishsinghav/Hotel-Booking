import express from "express";
import {
  createPostController,
  getPostController,
  getAllPostController,
  updatePostController,
  deletePostController,
  getRealtedPostController,
  serachProductController,
  postFiltersController,
} from "../controller/Post.js";

const routes = express.Router();
routes.post("/create-post", createPostController);
routes.get("/get-post/:slug", getPostController);
routes.get("/get-all-posts", getAllPostController);
routes.put("/update-post/:id", updatePostController);
routes.delete("/delete-post/:id", deletePostController);
routes.get("/related-post/:pid/:cid", getRealtedPostController);
// routes.post("/product-filter", postFiltersController);
routes.get("/search/:keyword", serachProductController);
export default routes;
