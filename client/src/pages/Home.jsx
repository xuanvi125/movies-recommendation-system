import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Banner from "../components/Banner";

export default function Home() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");
  useEffect(() => {
    const oldToken = localStorage.getItem("token");
    if (!oldToken && token) {
      localStorage.setItem("token", token);
      window.location.href = "/movies-recommendation-system/";
    }
  }, [token]);

  return (
    <div>
      <p className="text-white bg-[#082f49] h-screen">
        Home Page - Trending Movies
      </p>
    </div>
  );
}
