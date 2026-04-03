import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";


function Navbar() {
  //bring in user info from context
  const { user, logout } = useUser();

   const navStyle = {
    padding: "10px 20px",
    backgroundColor: "#dc2626",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    position: "fixed",   // fixed
    top: 0,              // stick to top
    left: 0,
   width: "98%" ,      // full width
    zIndex: 1000  ,
   
  };

  const ulStyle = {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    margin: 0,
    padding: 0,
    alignItems: "center"
  };
 const linkStyle = {

    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
  
  };

   const welcomeStyle = {
    margin: 0,
    fontWeight: "bold",
  };

  return (
    <nav style={navStyle}>
      {user && <p style={welcomeStyle} >WelCome {user.username}</p>}
      <ul style={ulStyle}>
        {user ? (
          <>
            <li>
              <Link to="/dashboard" style={linkStyle} >Dashboard</Link>
            </li>
            <li onClick={logout}>
              <Link to="/login"  style={linkStyle} >Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" style={linkStyle} >Login</Link>
            </li>
            <li>
              <Link to="/register" style={linkStyle} >Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
