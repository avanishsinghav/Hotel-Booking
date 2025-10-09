import cloudinary from "../config/Cloudnary.js";
import Post from "../models/Post.js";
import slug from "slugify";
import mongoose from "mongoose";
export const createPostController = async (req, res) => {
  try {
    const {
      title,
      hotelLocation,
      description,
      facilities,
      nearArea,
      category,
      guest,
      isAvailable,
      price,
    } = req.body;
    const files = req.files?.images;

    if (
      !title ||
      !description ||
      !facilities ||
      !nearArea ||
      !hotelLocation ||
      !category ||
      !guest ||
      !isAvailable ||
      !price
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!files || files.length !== 3) {
      return res
        .status(400)
        .json({ message: "Please upload exactly 3 images." });
    }

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      files.map((file) =>
        cloudinary.uploader
          .upload(file.tempFilePath)
          .then((result) => result.secure_url)
      )
    );

    // Create new post
    const newPost = new Post({
      title,
      hotelLocation,
      description,
      facilities,
      nearArea,
      category,
      guest,
      isAvailable,
      price,
      images: imageUrls,
      slug: slug(title, { lower: true }),
    });

    // Save post to MongoDB
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getPostController = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    return res.status(200).send({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting post",
      error,
    });
  }
};
export const getAllPostController = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).send({
      success: true,
      message: "Posts fetched Successfully",
      posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error while getting all posts",
      err,
    });
  }
};

export const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      hotelLocation,
      description,
      category,
      isAvailable,
      guest,
      price,
      nearArea,
      facilities,
    } = req.body;

    const files = req.files?.images;
    // find the existing post
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // validate the field
    if (
      !title &&
      !hotelLocation &&
      !description &&
      !category &&
      !isAvailable === undefined &&
      !guest &&
      !price &&
      !nearArea &&
      !facilities &&
      !files
    ) {
      return res.status(400).jso({ message: "No fields provided to update" });
    }

    /// handle image update

    let uploadimages = Post.images;
    if (files && files.length === 3) {
      // delete the old imaage
      await Promise.all(
        Post.images.map((url) => {
          const publicId = url.split("/").pop().split(".")[0];
          return cloudinary.uploader.destroy(publicId);
        })
      );
      // upload new images

      uploadimages = await Promise.all(
        files.map((file) =>
          cloudinary.uploader
            .upload(file.tempFilePath)
            .then((result) => result.secure_url)
        )
      );
    } else if (files && files.length !== 3) {
      return res
        .status(400)
        .Postjson({ message: "Please upload exactly 3 images" });
    }

    const updatePost = await Post.findByIdAndDelete(id, {
      ...(title && { title }),
      ...(hotelLocation && { hotelLocation }),
      ...(description && { description }),
      ...(facilities && { facilities }),
      ...(nearArea && { nearArea }),
      ...(category && { category }),
      ...(guest && { guest }),
      ...(isAvailable !== undefined && { isAvailable }),
      ...(price && { price }),
      ...(files && { images: uploadimages }),
      ...(title && { slug: slug(title, { lower: true }) }),
    });

    await updatePost.save();
    return res.status(200).send({
      sucess: true,
      message: "Post updated successfully",
      updatePost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating post",
      error,
    });
  }
};
export const deletePostController = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(req.prams.id);
    return res.status(200).send({
      sucess: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error while deleting post",
      err,
    });
  }
};

export const getRealtedPostController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const relatedPost = await Post.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(2)
      .populate("category");

    return res.status(200).send({
      success: true,
      message: "Related posts fetched successfully",
      relatedPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error while fetching related posts",
      err,
    });
  }
};

export const serachProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const word = keyword.split(" ");
    const regexString = word.join("|");

    const results = await Post.find({
      $or: [
        { title: { $regex: word[0], $options: "i" } },
        {
          description: {
            $regex: regexString,
            $options: "i",
          },
        },
        { hotelLocation: { $regex: regexString, $options: "i" } },
      ],
    }).select("title  hotelLocation images description slug");
    res.json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error while fetching related posts",
      err,
    });
  }
};
export const postFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    // Build query object
    let args = {};
    if (checked?.length) args.guest = { $in: checked }; // Match guest count
    if (radio?.length === 2) args.price = { $gte: radio[0], $lte: radio[1] }; // Match price range

    // Fetch filtered posts
    const products = await Post.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error while filtering products:", error);
    res.status(500).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};
