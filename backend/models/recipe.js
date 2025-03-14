import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String], // Array of ingredient names
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    img:{
        type:String,
        required:true
    }
}, { timestamps: true });

export const Recipe = mongoose.model("Recipe", recipeSchema);
