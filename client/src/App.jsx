import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import GuestRoute from "./utils/GuestRoute";
import ProfilePage from "./pages/ProfilePage";
import AppLayout from "./pages/layout/AppLayout";
import SearchResult from "./pages/SearchResult";
import { PageNotFound } from "./pages/PageNotFound";
import MovieDetail from "./pages/MovieDetail.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
              <AppLayout />
          }
        >
          <Route index element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
