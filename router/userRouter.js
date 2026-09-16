const express = require("express");
const User = require("../model/userModel");

const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error.message);
        const statusCode = error.code === 11000 || error.name === "ValidationError" ? 400 : 500;
        res.status(statusCode).json({ message: "Failed to create user", error: error.message });
    }
});

userRouter.get("/", async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error retrieving users:", error.message);
        res.status(500).json({ message: "Failed to retrieve users", error: error.message });
    }
});

module.exports = userRouter;
