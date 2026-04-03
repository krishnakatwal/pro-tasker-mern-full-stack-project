import { useLoading } from "./context/LoadingContext.jsx";
import "./App.css";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext.jsx";
import Navbar from "./components/Navbar.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";

function App() {
  //bring in user info
  const { user } = useUser();
  
  const { loading, error } = useLoading();

  return (
    <>
      <h1 style={{  fontSize: "6vw",textAlign: "center", marginBottom: "20px",color: "#2563eb"}}>Pro Tasker</h1>
      {/* inserts the navigation bar at the top of the page. */}
      <Navbar />

      {/* Loading UI */}
      {loading && <p>Loading...</p>}

      {/* Error UI */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
