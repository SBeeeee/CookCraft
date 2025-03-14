"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Logout from "../components/Logout";

const page = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [url, setUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { user} = useAuth();
  


  const fetchRecipes = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredients.split(",") }),
        credentials: "include",//to send cookie info 
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      console.log(data.recipes)
      setRecipes(data.recipes);
    } catch (err) {
      setError(err.message || "Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructions = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/recipe/information/${id}`, {
        method: "GET",
        credentials: "include",//to send cookie info 
      });
      const data = await res.json();
      setInstructions(data.instructions)
      fetchUrl(id);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUrl = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/recipe/geturl/${id}`, {
        method: "GET",
        credentials: "include",//to send cookie info 
      });
      const data = await res.json();
      setUrl(data.response.sourceUrl);
    } catch (error) {
      console.log(error);
    }
  }
  //{ userId, title, ingredients, instructions } 
  const saveToFavorites = async () => {
    if (!selectedRecipe || instructions.length === 0) return;

    const instructionsArray = instructions.flatMap(inst => inst.steps.map(step => step.step));
    const ingredientsArray = [
      ...selectedRecipe.usedIngredients.map(ing => ing.name),
      ...selectedRecipe.missedIngredients.map(ing => ing.name)
    ];

    const favoriteData = {
      userId:user._id,
      title: selectedRecipe.title,
      ingredients: ingredientsArray,
      instructions: instructionsArray,
      img: selectedRecipe.image
    };

    try {
      await fetch("http://localhost:8000/recipe/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteData),
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="text-right mt-2"><Logout/></div>
      <div className="flex min-h-[90vh]">
      
        <div className="  w-[40%] ">
          <div className="text-4xl font-bold p-4">Got ingredients? We've got recipes! Just tell us what you have, and we’ll whip up the perfect dish!</div>
          <div className="p-4 my-2 ml-12 bg-gray-900 text-white rounded-xl w-[80%] shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-4">Recipe Generator</h1>
            <input
              type="text"
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white mb-3"
              placeholder="Enter ingredients (comma-separated)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <button
              onClick={fetchRecipes}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-md"
              disabled={loading}
            >
              {loading ? "Generating..." : "Get Recipes"}
            </button>
          </div>
        </div>

        <div className=" w-[60%]  ">
          {error && <p className="text-red-400 mt-3">{error}</p>}
          {recipes.length == 0 && <div className="text-center text-2xl font-bold mt-35">Please Enter Ingredients And Get The Best Delicious Recipes</div>}
          {recipes.length>0 && <h1 className="text-2xl font-bold text-center mt-2">Recipes:</h1>}
          <div className="flex justify-evenly">
          
            {recipes.map((element) => (
              <div key={element.id} className="border-blue-900 border-x-2 border-y-6 w-60 shadow-2xl rounded-2xl p-2 mt-4 flex flex-col">
                
                <div className="flex-grow">
                  <img src={element.image} className="w-full h-40 object-cover" />
                  <h1 className="text-center text-lg font-bold">{element.title}</h1>
                  <div className="text-lg font-bold">Ingredients Already there:
                    <span className="font-extralight text-xl">
                      {element.usedIngredients.map((ing, index) => (
                        <div key={index}>{index + 1}: {ing.name}</div>
                      ))}
                    </span>
                  </div>
                  <div className="text-lg font-bold">Missed Ingredients Needed:
                    <span className="font-extralight text-xl">
                      {element.missedIngredients.map((ing, index) => (
                        <div key={index}>{index + 1}: {ing.name}</div>
                      ))}
                    </span>
                  </div>
                </div>

                {/* Button always at bottom */}
                <button
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md"
                  onClick={() => {
                    fetchInstructions(element.id);
                    setIsModalOpen(true);
                    setSelectedRecipe(element);
                  }}
                >
                  Get instructions
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-40  bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Instructions:</h2>
            <div>
              {instructions.map((element, index) => (
                <div key={index}>
                  {element.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="mb-2">
                      <strong>{step.number}:</strong> {step.step}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <a className="font-bold text-amber-950" href={url} target="_blank" rel="noopener noreferrer">
              Click for Further Details
            </a>
            <button onClick={()=>{saveToFavorites()}} className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-md">
              Add to Favorites
            </button>
            <button
              onClick={() => { setIsModalOpen(false) }}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default page;
