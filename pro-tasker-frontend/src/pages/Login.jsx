import { useLoading } from "../context/LoadingContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userClient } from "../clients/api.js";
import { useUser } from "../context/UserContext.jsx";
import useAuthValidation from "../hook/useAuthValidation.js";

function Login() {
  const { errors, validateLogin } = useAuthValidation();

  //Bring in the setter function from the context
  const { loading, startLoading, stopLoading, setErrorMessage } = useLoading();

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

    const isValid = validateLogin(form);
    if (!isValid) return;

    try {
      startLoading();
      //send the form data to our backend
      const { data } = await userClient.post("/login", form);

      //take the token and store it locally
      localStorage.setItem("token", data.token);

      //save some user data in our state
      setUser(data.user);
      stopLoading();
      //take the user to a different page
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login Page</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div>
        <label htmlFor="email">Email:</label>
        <input
          value={form.email}
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          required
          style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
            }}
        />
        </div>

        <div>

      

        <label htmlFor="password">Password:</label>
        <input
          value={form.password}
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          required
         style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
            }}
        />
          </div>

        <button
          style={{
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#2563eb",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            color: "#fff",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
