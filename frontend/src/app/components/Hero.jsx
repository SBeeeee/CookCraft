"use client"
import React from 'react'
import Spline from '@splinetool/react-spline'

const Hero = () => {
  return (
    <div className=" h-[400px]  mt-2 mx-5 flex justify-center  ">
      <div className=" w-[50%]  font-extrabold text-7xl"><div>Unlock delicious  Recipes With Your Ingredients</div>
        <div className="text-2xl mt-2 font-light">Discover a world of culinary possibilities with recipe generator.Simply input your ingredients and let us inspire </div>
        <button className="bg-black text-white text-lg rounded-2xl text-center font-light px-4 py-1">Explore Recipes</button>
        <button className="bg-white text-black border-1 border-black text-lg rounded-2xl text-center font-light px-4 py-0.5 ml-2">Learn more</button>
      </div>
      <div className="text-center w-[50%] ">
        <Spline scene="https://prod.spline.design/eNlClJlhY-8GmJvD/scene.splinecode"></Spline>
      </div>

    </div>
  )
}

export default Hero
