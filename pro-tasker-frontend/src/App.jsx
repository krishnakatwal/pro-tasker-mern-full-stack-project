import "./App.css";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import { Routes,Route,Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {


  //bring in user info 
  const {user} = useUser()

  return (
    <>
     <h1>Welcome</h1>
      {/* inserts the navigation bar at the top of the page. */}
      <Navbar />
     
      {user ? (
        <Routes>
          <Route path='/dashboard' element={<Dashboard/ >} />
          <Route />
        </Routes>

      ):(
        <Routes>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<Navigate to="/login"/>} />
              
        </Routes>
      )}
    </>
  );
}

export default App;
