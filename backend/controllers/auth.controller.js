import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email or username already in use"
            });
        }

        const hashedPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const access_token = jwt.sign(
            {
                id: newUser._id
            },
            config.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        const refresh_token = jwt.sign(
            {
                id: newUser._id
            },
            config.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(201).json({
            message: "User registered successfully",
            newUser: {
                username: newUser.username,
                email: newUser.email
            },
            token: access_token,
            access_token,
            refresh_token
        });

    } catch (error) {

        console.error("Error registering user", error);

        return res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
};

export const loginUser = async (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if ((!email && !username) || !password) {
        return res.status(400).json({
            message: "Email/username and password are required"
        });
    }

    try {

        const user = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const hashedPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        const isPasswordValid =
            hashedPassword === user.password;

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            config.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                username: user.username,
                email: user.email
            },
            token
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
};

export const getMe = async(req,res) =>{
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }
    const decoded = jwt.verify(token,config.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.id).select("-password");

    res.status(200).json({
        message: "User found",
        user: {
            username: user.username,
            email: user.email
        }
    });

}    // token ko recognise karke user ko identify karo and then us user 
// ki details response me bhejdo 

export const logoutUser = async (req, res) => {
    return res.status(200).json({
        message: "User logged out successfully"
    });
};