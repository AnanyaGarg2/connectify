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

        res.status(200).json({
            message: "User data validated successfully"
        });

    } catch (error) {
        console.error("Error registering user", error);

        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }

    const hashedPassword = await crypto.createHash("sha256").update(password).digest("hex");

    const newUser = await new User({
        username,
        email,
        password: hashedPassword
    });
    const token = jwt.sign({
        id:new_user.id
    },config.JWT_SECRET,{
        expiresIn : "1d"
})

res.status(201).json({
    message : "User registered successfully",
    newUser:{
username : newUser.username,
email : newUser.email
    },
    token
})

};

export const loginUser = async (req, res) => {
};

export const logoutUser = async (req, res) => {
};

export const getMe = async(req,res) =>{

}