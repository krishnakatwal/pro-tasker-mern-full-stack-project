import User from "../models/User.js";
import {signToken} from '../utils/auth.js'
import bcrypt from 'bcrypt'


//Register a user
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    //find a user in the database using their email.
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //check if the entered password matches the stored (hashed) password.
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!correctPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //Creates a login token and sends both the token and
    // user details to the frontend so the user can stay logged in.
    const token = signToken(user);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
