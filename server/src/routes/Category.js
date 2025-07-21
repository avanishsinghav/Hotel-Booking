import express from "express";
import {
  createCateoryController,
  deleteCategory,
  getAllcategory,
  updateCategoryController,
  singleCategory,
  selectedCategoryController,
} from "../controller/Category.js";

import { isAdmin, requireSignIn } from "../middleware/Auth.js";
const app = express.Router();
app.post("/create-category", createCateoryController);
app.get("/get-category", getAllcategory);
app.put("/update-category/:id", updateCategoryController);
app.delete("/delete-category/:id", deleteCategory);
app.get("/single-category/:slug", singleCategory);
app.get("/select-category/:slug", selectedCategoryController);

export default app;
