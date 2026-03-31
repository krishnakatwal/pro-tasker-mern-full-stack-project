/**createContext → creates global state,useContext → lets components access it,useState → stores user data,
useEffect → runs code when app loads,useNavigate → redirects users,token() → gets JWT from localStorage,userClient → API calls (Axios) */

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { token, userClient } from "../clients/api.js";

//share user data across the app without prop drilling.
const UserContext = createContext(null);

//Checks if a token exists in localStorage (via token()), if there's a token, assume there's a user that just needs to be verified
const initialUser = token() ? { username: null } : null;

//This wraps your entire app, provides user-related data to all child components.
function UserProvider({ children }) {
  // set the initial state to null or a temporary user: { username: null }
  const [user, setUser] = useState(initialUser);

  const navigate = useNavigate();

  // useEffect that verifies the token and retrieves user data
  useEffect(() => {
    async function getUser() {
      try {
        // check if there's a token (if no token, then we can skip steps)
        if (!token()) return;

        // use the token to verify the user (is token valid? is it expired?)
        const { data } = await userClient.get("/");

        // if verified that token is legit, take the user data and save it to state
        setUser(data);
      } catch (error) {
        //  // if verification fails, logout the user
        console.log(err);
        logout();
      }
    }
    getUser();
  }, []);

  const logout = () => {
    // clear the user state
    setUser(null);

    // clear the local storage
    localStorage.removeItem("token");

    // navigate the user to login
    navigate("/login");
  };
  // packaging up everything we want available to make available from our context
  const value = {
    user,
    setUser,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {/* "children" here represents our <App /> */}
      {children}
    </UserContext.Provider>
  );
}
// custom hook to easily access context value
export function useUser() {
  return useContext(UserContext);
}

export default UserProvider;
