import React from 'react'
import { FaCube } from "react-icons/fa";

const Cards = () => {
  return (
    <div>
      <div className="text-5xl px-36 text-center font-bold text-purple-600 mt-5 mb-10">
        Discover How To Create Delicious Meals With our Recipe Generator .
      </div>
      <div className="flex justify-evenly ">
        <div className="bg-blue-200 w-64 h-64 rounded-2xl border-y-6 border-x-2">
        <FaCube className="ml-28 mt-2"/>
            <div className="text-center text-lg font-bold mt-2.5">Easily input ingredients and explore  endless recipe possibilities </div>
            <div className="text-center font-light text-lg">Start by entering the ingredients you u have</div>
        </div>
        <div className="bg-blue-200 w-64 h-64  rounded-2xl border-y-6 border-x-2">
        <FaCube className="ml-28 mt-2"/>
            <div className="text-center text-lg font-bold mt-2.5">Get personalized recipe  suggestions tailored to your ingredients</div>
            <div className="text-center font-light text-lg">Recieve a list of recipes that you can easily follow</div>
        </div>
        <div className="bg-blue-200 w-64 h-64 rounded-2xl border-y-6 border-x-2">
        <FaCube className="ml-28 mt-2"/>
            <div className="text-center text-lg font-bold mt-2.5">Save your favorite recipes for quick access  anytime</div>
            <div className="text-center font-light text-lg">Keep your culinary creation organized and at your fingertips</div>
        </div>
        
        
      </div>
    </div>
  )
}

export default Cards
