/**Dashboard → list view */
import { useLoading } from "../context/LoadingContext.jsx";
import Spinner from "../components/Spinner.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectClient } from "../clients/api.js";
import ProjectCard from "../components/ProjectCard.jsx";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  // const [filteredProjects, setFilteredProjects] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");

  const { loading, startLoading, stopLoading, setErrorMessage } = useLoading();
  const navigate = useNavigate();

  //fetch Projects
  useEffect(() => {
    async function getProjects() {
      try {
        startLoading();
        //get our project from db
        const { data } = await projectClient.get("/");

        // console.log(data);

        //save that in component's state
        setProjects(data.projects || data || []);
        stopLoading();
      } catch (error) {
        setErrorMessage(error.response?.data || error.message);
      }
    }
    getProjects();
  }, []);

  //create project
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      startLoading();
      //make a POST request to create the post (based off the state: title and body)
      const { data } = await projectClient.post("/", {
        name,
        description,
        status,
      });

      //add the new post to our state
      setProjects([data, ...projects]);

      //reset the form
      setName("");
      setDescription("");
      setStatus("pending");

      stopLoading();
    } catch (error) {
      setErrorMessage("Failed to create project");
    }
  };
  // Loading UI
  if (loading) return <Spinner />;

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Title */}
      <h1
        style={{
          color: "#2563eb",
          textAlign: "center",
          fontSize: "clamp(24px, 5vw, 48px)", // 👈 responsive font
          fontWeight: "bold",
          marginTop: "0px",
          marginBottom: "20px",
        }}
      >
        Dashboard Page
      </h1>

      {/* Layout Wrapper */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {/* Create Project Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ margin: 0 }}>Create a Project Here:</h2>

          <label htmlFor="name">Name:</label>

          <input
            id="name"
            required={true}
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Project Name"
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px",
              width: "100%",
              boxSizing: "border-box",
               boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />

          <label htmlFor="description">Description:</label>

          <textarea
            type="text"
            id="description"
            required={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <option>Pending</option>
            <option>In-Progress</option>
            <option>Completed</option>
          </select>

          <button
            type="submit"
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create Project
          </button>
        </form>

        {/* Project List */}
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {projects.length === 0 ? (
            <p style={{ textAlign: "center" }}>No Projects found.</p>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                setProjects={setProjects}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
