import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userClient } from "../clients/api.js";
import { useUser } from "../context/UserContext.jsx";

function Login() {
  //Bring in the setter function from the context
  const { setUser } = useUser();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //send the form data to our backend
      const { data } = await userClient.post("/login", form);

      //take the token and store it locally
      localStorage.setItem("token", data.token);

      //save some user data in our state
      setUser(data.user);

      //take the user to a different page
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          value={form.email}
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          value={form.password}
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          required
        />

        <button>Login</button>
      </form>
    </div>
  );
}
export default Login;
