"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      alert("please login ");
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>; // Prevent redirect until loading completes
  if (!user) return null; // Prevent flashing of protected content before redirect

  return children;
};

export default ProtectedRoute;
