import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

router.post("/signup", async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered" });
  } catch (err) {
    console.log("Error while creating user", err);
  }
});

router.post("/login", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user: any = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "");
    res.json({ token });
  } catch (err) {
    console.log("error while signing in for user ", err);
  }
});

export default router;
