import "./App.css";
import AddMovie from "./components/AddMovie";
import AdminMovie from "./components/AdminMovie";
import EditMovie from "./components/EditMovie";
import Login from "./components/Login";
import MovieList from "./components/MovieList";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdmin from "./components/ProtectedAdmin"
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userdetails } from "./redux/Slice/authSlice";
import { useEffect } from "react";
import LoadingPage from "./components/LoadingPage";
function App() {
  const dispatch = useDispatch();
    const { user,loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(userdetails());
  }, []);
  return (
    <>
     {loading ? <LoadingPage/>:
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MovieList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addmovies"
          element={
            <ProtectedAdmin>
              <AddMovie />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/editmovies/:id"
          element={
            <ProtectedAdmin>
              <EditMovie />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/adminmovies"
          element={
            <ProtectedAdmin>
              <AdminMovie />
            </ProtectedAdmin>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>}
    </>
  );
}

export default App;
