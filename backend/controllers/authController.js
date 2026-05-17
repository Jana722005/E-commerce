const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
const registerUser = async (req, res) => {
  try {

    console.log(req.body);
    
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PROFILE
const getProfile = async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    ).select("-password");

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (
  req,
  res
) => {

  try {

    console.log(req.file);

    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }

    // UPDATE TEXT FIELDS
    user.name =
      req.body.name || user.name;

    user.email =
      req.body.email || user.email;

    user.phone =
      req.body.phone || user.phone;

    user.address =
      req.body.address || user.address;

    // UPDATE IMAGE
    if (req.file) {

      user.profileImage =
        req.file.path;
    }

    const updatedUser =
      await user.save();

    res.status(200).json({

      message:
        "Profile updated successfully",

      user: updatedUser,
    });

  } catch (error) {

    console.log(
      "PROFILE UPDATE ERROR:",
      error
    );

    res.status(500).json({

      message:
        error.message ||
        "Profile update failed",
    });
  }
};

// ADD TO WISHLIST
const addToWishlist = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.params.userId
      );

    // CHECK EXISTING
    if (
      user.wishlist.includes(
        req.body.productId
      )
    ) {

      return res.status(400).json({
        message:
          "Product already in wishlist",
      });
    }

    user.wishlist.push(
      req.body.productId
    );

    await user.save();

    res.status(200).json({
      message:
        "Added to wishlist",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET WISHLIST
const getWishlist = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.params.userId
      ).populate("wishlist");

    res.status(200).json(
      user.wishlist
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// REMOVE FROM WISHLIST
const removeFromWishlist =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.userId
        );

      user.wishlist =
        user.wishlist.filter(
          (product) =>
            product.toString() !==
            req.params.productId
        );

      await user.save();

      res.status(200).json({
        message:
          "Removed from wishlist",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};