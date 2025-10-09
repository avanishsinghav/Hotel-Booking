import slugify from "slugify";
import CategoryModel from "../models/Category.js";
import slug from "slugify";
import postModel from "../models/Post.js";

export const createCateoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({
        message: "Category already exists",
      });
    }
    const newcategory = await new CategoryModel({
      name,
      slug: slug(name),
    }).save();
    return res.status(201).send({
      sucess: true,
      message: "Category has been created",
      newcategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while creating category",
      error,
    });
  }
};

export const getAllcategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "Categories fetched successfullly",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while fetching categories",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error while updating cateegory",
      err,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while updating cateegory",
      err,
    });
  }
};

export const singleCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const post = await postModel.find({ category }).populate("category");
    return res.status(200).send({
      success: true,
      message: "Category fetched successfully",
      category,
      post,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while updating cateegory",
      error,
    });
  }
};
export const selectedCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await postModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      message: "Your selected products has been fetched",
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Selected Product API",
    });
  }
};
