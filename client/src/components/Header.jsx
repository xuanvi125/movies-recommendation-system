import { Typography, Button, Avatar } from "@material-tailwind/react";
import logo from "../assets/logo.svg";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOG_OUT" });
    navigate("/login");
  };

  const [query, setQuery] = useState('');

  return (
    <header className="bg-[#082f49] h-[60px]  flex items-center justify-between p-4 px-10">
      <div className="text-white text-lg font-semibold">
        <Link to="/">
          <img src={logo} alt="" className="h-5 w-auto" />
        </Link>
      </div>
      <div className="flex gap-3 items-center">

        <div className="relative">
            <input
                className="w-full bg-black placeholder:text-gray-400 text-white text-sm border border-gray-700 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-gray-500 hover:border-gray-600 shadow-sm focus:shadow"
                placeholder="Movie name..."
                onChange={(e) => setQuery(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?query=${query}`)}
            />
            <Link to={`/search?query=${query}`}
                className="absolute top-1 right-1 flex 
                            items-center rounded bg-gray-700 py-1 px-2.5
                            text-sm text-white transition-all 
                            shadow-sm hover:shadow focus:bg-gray-600  
                            active:bg-gray-600 hover:bg-gray-600"
                type="submit"
            >
                Search <MagnifyingGlassIcon className="w-4 h-4 ml-2"/>
            </Link> 
        </div>


        {user && (
          <div className="flex gap-3 items-center">
            <Typography color="white">
              <span className="font-bold">{user?.name}</span>
            </Typography>
            <Link to="/profile">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
            </Link>
            <Button onClick={handleLogOut} className="bg-red-400">
              Log Out
            </Button>
          </div>
        )}

        {!user && (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
