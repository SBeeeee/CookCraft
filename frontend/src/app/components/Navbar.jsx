import React from 'react'
import Link from 'next/link'


const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-14 shadow-2xl bg-white sticky top-0 z-50 ">
      <Link href="/" className="ml-2 text-2xl font-extrabold text-purple-400">CookCraft</Link>
      <div className="flex gap-4 items-center"> 
        <Link href="/">Home</Link>
      <Link href="recipe">Recipies</Link>
      <Link href="">About Us </Link>
      <Link href="favorites">Favourites </Link>
      </div>
     <div>
     <Link href="signup" className="">Signup</Link>
    <Link href="login" className="bg-purple-600 p-1 text-white rounded-2xl ml-2 text-center px-4 mr-2">Login</Link>
</div>
    </div>
  )
}

export default Navbar
