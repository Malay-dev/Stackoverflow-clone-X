import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth.js";

export const signup = async (req, res) => {
  const { name, email, password, dob } = req.body;
  console.log(req.body);
  try {
    const extinguisher = await users.findOne({ email });
    if (extinguisher) {
      return res.status(404).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
      dob,
    });

    const token = Jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );
    res.status(200).json({ result: newUser, token });
  } catch (err) {
    res.status(500).json("Something went wrong...");
    console.log(err);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const extinguisher = await users.findOne({ email });
    if (!extinguisher) {
      return res.status(404).json({ message: "User does'nt exist" });
    }
    const isPasswordCrt = await bcrypt.compare(password, extinguisher.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invaild Credentials" });
    }
    const token = Jwt.sign(
      { email: extinguisher.email, id: extinguisher._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );
    res.status(200).json({ result: extinguisher, token });
  } catch (err) {
    res.status(500).json("Something went wrong...");
    console.log(err);
  }
};
