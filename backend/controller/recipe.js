import axios from "axios";
import dotenv from "dotenv";
import { Recipe } from "../models/recipe.js";

dotenv.config();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY; 

export const generater = async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ success: false, message: "Provide ingredients" });
    }

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`, 
      {
        params: {
          ingredients: ingredients.join(","),
          number: 3, // Get 3 recipes
          apiKey: SPOONACULAR_API_KEY,
        },
      }
    );

    res.json({ success: true, recipes: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching recipe" });
  }
};

export const information = async(req,res)=>{
  try {
    const {id}=req.params;
    if (!id ) {
      return res.status(400).json({ success: false, message: "Id not available" });
    }
    
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/analyzedInstructions`,
      {
        params: { apiKey: SPOONACULAR_API_KEY },
      }
    );

    res.json({success:true,instructions:response.data})

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching recipe" });
  }
}

export const geturl =async (req,res)=>{
  try {
    const {id}=req.params;

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: { apiKey: SPOONACULAR_API_KEY },
      }
    );

    res.json({ success: true, response:response.data });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching recipe" });
  }
}

export const saveRecipe = async (req, res) => {
    try {
        const { userId, title, ingredients, instructions,img } = req.body;

        const newRecipe = new Recipe({
            userId,
            title,
            ingredients,
            instructions,
            img
        });

        await newRecipe.save();
        res.status(201).json({ message: "Recipe saved successfully!", recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ error: "Error saving recipe", details: error.message });
    }
};

export const getRecipes =async(req,res)=>{
  try {
    
    const {id}=req.params;
    const recipe= await Recipe.find({userId:id})
    res.json({
      success:true,
      response:recipe
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching recipe" });
  }
}