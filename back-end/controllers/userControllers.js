import asyncHandler from "express-async-handler";
import generateToken from "../tokens/generateToken.js";
import User from "../models/userModel.js";

//@description Auth user and get Token
//@route Post /api/products
//@access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
});
//@description Get user profile
//@route GET /api/users/profile
//@access private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("success");
});

export { authUser, getUserProfile };
