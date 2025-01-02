const express = require("express");
const { mongoose } = require("mongoose");
const router = express.Router();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

// zod userSchema
const userSchema = z.object({
  firstName: z
    .string()
    .max(50, "first name must not exceed 50 characters")
    .trim()
    .nonempty("FisrtName is required"),
  lastName: z
    .string()
    .max(50, "last name must not exceed 50 characters")
    .trim()
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters")
    .nonempty("Password is required"),
  userName: z
    .string()
    .email()
    .trim()
    .lowercase()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters")
    .nonempty("Username is required"),
});

// route for sign up
router.post("/signup", async (req, res) => {
  try {
    const { success } = userSchema.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        success: false,
        message: "Incorrect inputs",
      });
    }

    const { userName, password, firstName, lastName } = req.body;

    const isExistingUser = await User.findOne({ userName });

    if (isExistingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already taken",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hahsedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      userName,
      lastName,
      password: hahsedPassword,
      firstName,
    });

    const userId = newUser._id;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      message: "User craeted sucessfully",
      token,
    });
  } catch (err) {
    console.error("Error while sign-up:", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// route for signin
router.post("/signin", async (req, res) => {
  try {
    const success = userSchema.safeParse(req.body);
    if (!success) {
      return res.status(401).json({
        success: false,
        message: "Incorrect inputs",
      });
    }

    const { userName, password } = req.body;

    const user = await User.findOne({userName});

    if (!user) {
      return res.status(411).json({
        success: false,
        message: "User not exist",
      });
    }

    // check password is correct or not
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const userId = user._id;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (err) {
    console.error("Error while sign-in:", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
