/**Dashboard → list view */

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

  const navigate = useNavigate();

  //fetch Projects
  useEffect(() => {
    async function getProjects() {
      try {
        //get our project from db
        const { data } = await projectClient.get("/");

        // console.log(data);

        //save that in component's state
        setProjects(data.projects || data || []);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }
    getProjects();
  }, []);

  //create project
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Dashboard Page</h1>

      {/* Create Project Form */}
      <form onSubmit={handleSubmit}>
        <h2>Create a Project Here:</h2>

        <label htmlFor="name">Name:</label>
        <input
          id="name"
          required={true}
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />

        <label htmlFor="description">Description:</label>

        <textarea
          type="text"
          id="description"
          required={true}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </select>

        <button type="subm it">Create Project</button>
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
