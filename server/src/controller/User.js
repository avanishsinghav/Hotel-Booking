import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Invalid role selected" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Registration failed",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "All field are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Invalid user details",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid Password",
      });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Problem in login API",
    });
  }
};
export const getuserController = async (req, res) => {
  try {
    console.log(req.user.id);
    const user = await userModel.findById(req.user?.id).select("-password");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error fetching user profile",
    });
  }
};
