import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";
import { Routes,Route,Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext.jsx";

function App() {

  //bring in user info 
  const {user} = useUser()
  return (
    <>
      {/* inserts the navigation bar at the top of the page. */}
      {/* <Navbar /> */}
      <h1>Welcome</h1>
      {user ? (
        <Routes>
          <Route></Route>
          <Route></Route>
        </Routes>

      ):(
        <Routes>
            <Route path="/register" element={<Register/>} />
            <Route></Route>
            <Route></Route>
              
        </Routes>
      )}
    </>
  );
}

export default App;
