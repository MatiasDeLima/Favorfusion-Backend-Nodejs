import Food from "../models/Food.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {

    const foodId = req.params.foodId;
    const newReview = new Review({ ...req.body });

    try {
        const savedReview = await newReview.save();

        await Food.findByIdAndUpdate(foodId, {
            $push: { reviews: savedReview._id },
        });

        res.status(200).json({
            success: true,
            message: "Review submited",
            data: savedReview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to submit",
            error
        });
    }
};