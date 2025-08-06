import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const handleUserSignup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters " });

    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "Email already registered" });

    const salt = bcrypt.salt(10);
    const hashedPassword = bcrypt.hash(password, salt);

    const newUser = new User({ fullName, email, password: hashedPassword });
    if (newUser) {
      //generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleUserLogin = async (req, res) => {
  res.send("login");
};

export const handleUserLogout = async (req, res) => {
  res.send("logout");
};
