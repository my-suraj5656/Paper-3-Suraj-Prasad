import User from "../../../../database/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userModule = {
  // signUp
  async signUp(data, res) {
    try {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashPassword = await bcrypt.hash(data.password, 10);

      const payload = { ...data, password: hashPassword };
      const newUser = new User(payload);
      await newUser.save();

      return res.status(201).json({ message: "User signup successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "Signup Server Error" });
    }
  },

  // login
  async login(data, res) {
    try {
      const user = await User.findOne({ email: data.email });
      if (!user) {
        return res.status(400).json({ message: "Signup first" });
      }
      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const secret = process.env.JWT_SECRET || "fallback_secret";
      const token = jwt.sign({ id: user._id, email: user.email }, secret, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        message: "Login successful",
        data: {
          token,
          id: user._id,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "Login Server Error" });
    }
  },
};

export default userModule;
