import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import SavedRecipes from "./pages/SavedRecipes";
import UploadReport from "./pages/UploadReport";
import ProtectedRoute from "./routes/ProtectedRoute";
import TasteProfile from "./pages/TasteProfile";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/taste" element={<TasteProfile />} />
          <Route path="/recommend" element={<Recommendations />} />
          <Route path="/saved" element={<SavedRecipes />} />
          <Route path="/upload" element={<UploadReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
