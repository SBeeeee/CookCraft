"use client";

import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  return <button 
  className="text-xl font-semibold bg-purple-500 border-x-4 rounded-3xl px-2 border-y-2"
  onClick={logout}>Logout</button>;
};

export default LogoutButton;
