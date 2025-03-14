"use client";
import { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Logout from "../components/Logout";
import { useAuth } from "../context/AuthContext";

const page = () => {
  const [recipes, setRecipes] = useState([]);
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instructions, setInstructions] = useState([]);


  // Fetch favorite recipes when the user is available
  useEffect(() => {
    if (user) {
      fetchFavoriteRecipes(user._id);
    }
  }, [user]);

  const fetchFavoriteRecipes = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/recipe/getRecipes/${id}`, {
        method: "GET",
        credentials: "include", // to send cookie info
      });
      const data = await res.json();
      setRecipes(data.response); // Set the response as the list of favorite recipes
      console.log(data.response); // Log the recipes for debugging
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInstructions = (ini) => {
    setInstructions(ini);
    setIsModalOpen(true);
  }
  if (loading) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="p-4">
        <div className="text-right"><Logout/></div>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome, {user ? user.fullName : "Guest"} Your Saved Recipes:
        </h1>

        {recipes.length === 0 ? (
          <div>No favorite recipes found</div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {recipes.map((element) => (
              <div
                key={element._id}
                className="border-blue-900 border-x-2 border-y-6 w-60 shadow-2xl rounded-2xl p-2 mt-4 flex flex-col"
              >
                <div className="flex-grow">
                  <img
                    src={element.img}
                    className="w-full h-40 object-cover"
                    alt={element.title}
                  />
                  <h1 className="text-center text-lg font-bold">{element.title}</h1>
                  <div className="text-lg font-bold">
                    Ingredients:
                    <span className="font-extralight text-xl">
                      {element.ingredients && element.ingredients.length > 0 ? (
                        element.ingredients.map((ing, index) => (
                          <div key={index}>
                            {index + 1}: {ing}
                          </div>
                        ))
                      ) : (
                        <div>No ingredients listed</div>
                      )}
                    </span>
                    </div>
                    </div>
                    <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md"
                      onClick={() => { fetchInstructions(element.instructions) }}
                    >
                      Get Instructions
                    </button>
                  </div>
                
              
            ))}
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 z-40  bg-opacity-50 flex justify-center items-center">

            <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4">Instructions:</h2>
              {instructions.map((element, index) => (
                <div key={index}>
                  <strong>{index + 1}:</strong>{element}
                </div>
              ))}
              <button
                onClick={() => { setIsModalOpen(false) }}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded-md"
              >
                Close
              </button>
            </div>



          </div>)}

      
      </div>
    </ProtectedRoute>
  );
};

export default page;
