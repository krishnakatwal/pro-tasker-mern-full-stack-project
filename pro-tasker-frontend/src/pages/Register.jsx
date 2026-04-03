import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userClient } from "../clients/api.js";
import { useUser } from "../context/UserContext.jsx";
//custom API helper (usually Axios),Makes requests to your backend

function Register() {
  //// bring in the setter function from the context
  const { setUser } = useUser();
  const navigate = useNavigate();

  //form data - stores the values of the form fields
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  //Handling input changes
  const handlechange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  //submitting the form
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      // send the form data to our backend
      const { data } = await userClient.post("/register", form);

      // take the token and store it locally
      localStorage.setItem("token", data.token);

      // save some user data in our state
      setUser(data.user);

      // take the user to a different page
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    
    <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // centers horizontally
  }}
    >

       <h1 style={{ marginBottom: "20px" }}>Register Page</h1>
     
      <form onSubmit={handlesubmit}
      style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      width: "320px",
    }}
      >
        <label htmlFor="username">username:</label>

        <input
          value={form.username}
          onChange={handlechange}
          id="username"
          name="username"
          type="username"
          required

           style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        />

        <label htmlFor="email">Email:</label>
        <input
          value={form.email}
          onChange={handlechange}
          id="email"
          name="email"
          type="password"
          required
           style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        />

        <label htmlFor="password">Password:</label>
        <input
          value={form.password}
          onChange={handlechange}
          id="password"
          name="password"
          type="password"
          required
           style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        />

        <button
        style={{
          padding: "10px",
          marginTop: "10px",
          backgroundColor: "#fecaca", 
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        >Register</button>
      </form>
    </div>
  );
}

export default Register;
