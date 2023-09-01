import Food from "../models/Food.js";

// create food
export const createFood = async (req, res) => {
    const newFood = new Food(req.body);

    try {
        const savedFood = await newFood.save();

        res.status(200).json({
            success: true,
            message: "Successfully to created",
            data: savedFood
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to created",
            error
        });
    }
};

// update food 
export const updateFood = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedFood = await Food.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully to Updated",
            data: updatedFood
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to Updated"
        });
    }
};

// delete food 
export const deleteFood = async (req, res) => {
    const id = req.params.id;

    try {
        await Food.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully to delete"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete"
        });
    }
};

// get single food
export const getSingleFood = async (req, res) => {
    const id = req.params.id;

    try {
        const food = await Food.findById(id).populate("reviews");

        res.status(200).json({
            success: true,
            message: "Succesfully to find",
            data: food
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found"
        });
    }
};

// get all foods
export const getAllFood = async (req, res) => {
    // for pagination
    const page = parseInt(req.query.page);
    // console.log(page);

    try {
        const foods = await Food.find({}).populate("reviews").skip(page * 8).limit(8)

        res.status(200).json({
            success: true,
            count: foods.length, // quantidade de produtos
            message: "Successfully to find all",
            data: foods
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found"
        });
    }
};

// get food by search
export const getFoodBySearch = async (req, res) => {
    const title = new RegExp(req.query.title, "i");
    try {
        // gte means greater than equal
        const foods = await Food.find({
            title
        }).populate("reviews");

        res.status(200).json({
            success: true,
            message: "Successfully",
            data: foods
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not Found"
        });
    }
};

// get discount food
export const getDiscountFood = async (req, res) => {
    try {
        const foods = await Food.find({ discount: true }).populate("reviews").limit(8);

        res.status(200).json({
            success: true,
            message: "Successfully to get discount food",
            data: foods
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to get discount food"
        });
    }
};

// get food counts 
export const getFoodCount = async (req, res) => {
    try {
        const foodCount = await Food.estimatedDocumentCount();

        res.status(200).json({
            success: true,
            data: foodCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch"
        });
    }
};