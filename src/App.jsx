import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminAddMovie from "./pages/AdminAddMovie";
import AdminEditMovie from "./pages/AdminEditMovie";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/add" element={<AdminAddMovie />} />
          <Route path="/admin/edit/:id" element={<AdminEditMovie />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
