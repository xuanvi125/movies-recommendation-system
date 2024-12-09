import { Typography, Button, Avatar } from "@material-tailwind/react";
import logo from "../assets/logo.svg";
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
  return (
    <header className="bg-[#082f49] h-[60px]  flex items-center justify-between p-4 px-10">
      <div className="text-white text-lg font-semibold">
        <Link to="/">
          <img src={logo} alt="" className="h-5 w-auto" />
        </Link>
      </div>
      <div className="flex gap-3">
        {user && (
          <div className="flex gap-3 items-center">
            <Typography color="white">
              Welcome back, <span className="font-bold">{user?.email}</span>
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
