import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import foodRoute from "./routes/foods.js";
import userRoute from "./routes/foods.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true
}

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB Connect True");
    } catch (error) {
        console.log("MongoDB Connect False", error);
    }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/foods", foodRoute); // api/v1
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/review", reviewRoute);

app.listen(port, () => {
    connect();
    console.log(`Server listening on port: ${port}`);
})