import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./utils/ProtectRoute";
import GuestRoute from "./utils/GuestRoute";
import ProfilePage from "./pages/ProfilePage";
import AppLayout from "./pages/layout/AppLayout";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route
          path="/sign-up"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
