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
<div style={{
      padding: "24px",
      fontFamily: "Arial, sans-serif",
    }}>
      <h1 style={{color: "#2563eb",textAlign: "center", marginBottom: "20px", fontSize: "6vw",fontWeight: "bold", }}>Dashboard Page</h1>

      {/* Create Project Form */}
      <form onSubmit={handleSubmit}  style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "30px",
      }}>
        <h2>Create a Project Here:</h2>

        <label htmlFor="name">Name:</label>
         
        <input
          id="name"
          required={true}
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
          style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
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
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          minHeight: "80px",
        }}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}
          style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
          >
          <option>Pending</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </select>

        <button type="submit" style={{
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#2563eb",
          color: "#fff",
          cursor: "pointer",
          marginTop: "10px",
        }} >Create Project</button>
      </form>

      {/* Project List */}
      <div>
        {projects.length === 0 ? (
          <p>No Projects found.</p>
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
  );
}
export default Dashboard;
