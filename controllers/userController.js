import User from "../models/User.js";

// create user
export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(200).json({
            success: true,
            message: "Successfully to created",
            data: savedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to created"
        });
    }
};

// update user
export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedTour = await User.findById(id, 
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully to updated"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to updated"
        });
    }
};

// delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully to deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to deleted"
        });
    }
};

// get Single user 
export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            message: "Successfully to find",
            data: user
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
};

// get all users
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            message: "Successfully to get all",
            data: users
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found"
        });
    }
};