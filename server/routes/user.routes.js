const express = require("express");
const router = express.Router();
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const { Account } = require("../model/account.model.js");

// zod userSchema
const signupBody = zod.object({
userName: zod.string().email(),
firstName: zod.string(),
lastName: zod.string(),
password: zod.string()
})

// route for sign up
router.post("/signup", async (req, res) => {
  try {
    const { success } = signupBody.safeParse(req.body);
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

    // ----- Create new Account -------------------------
    await Account.create({
      userId,
      balance:1+Math.random()*10000 // initialize it with random balance
    })

    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    res.status(201).json({
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

const signinBody = zod.object({
userName: zod.string().email(),
password: zod.string()
})
// route for signin
router.post("/signin", async (req, res) => {
  try {
    // SafeParse for input validation
    const parsed = signinBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Incorrect inputs",
        errors: parsed.error.errors // Include the validation errors from Zod
      });
    }

    const { userName, password } = req.body;

    // Find user by userName (email)
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare the provided password with the stored hashed password
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
      message: "Internal server error",
    });
  }
});



// route to get users detail with filter
router.get('/bulk',async(req,res)=>{
  const filter = req.query.filter || "";

  const users = await User.find({
    $or:[{
      firstName:{
        "$regex":filter
      }
    },{
      lastName:{
        "$regex":filter
      }
    }]
  })

  res.json({
    user:users.map(user=>({
      userName:user.userName,
      firstName:user.firstName,
      lastName:user.lastName,
      _id:user._id
    }))
  })
})



module.exports = router;
