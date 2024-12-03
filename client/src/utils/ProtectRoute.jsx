import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";

function ProtectedRoute({ children }) {
  const { isAuth, isInitialize } = useAuth();
  if (!isInitialize) return <Loading />;
  if (!isAuth) return <Navigate to={"/login"} />;
  return children;
}

export default ProtectedRoute;
