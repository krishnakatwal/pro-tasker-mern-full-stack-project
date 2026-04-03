/**ProjectDetails → full page of one project */
import { useLoading } from "../context/LoadingContext";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectClient, taskClient } from "../clients/api";
import TaskCard from "../components/TaskCard";

function ProjectDetails() {
  const navigate = useNavigate();
  //grabs the id from the URL.
  const { projectId } = useParams();

  const { loading, startLoading, stopLoading, setErrorMessage } = useLoading();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  //Fetch the existing data when the page loads - project and tasks
  useEffect(() => {
    async function fetchProjectAndTasks() {
      try {
        startLoading();
        //We get the data and rename it to projectData immediately.
        // Fetch project
        const { data: projectData } = await projectClient.get(`/${projectId}`);
        setProject(projectData);

        // Fetch tasks for this project
        const { data: taskData } = await taskClient.get(`/${projectId}/tasks`);
        setTasks(taskData);

        stopLoading();
      } catch (error) {
        setErrorMessage(error.response?.data || error.message);
      }
    }
    fetchProjectAndTasks();
  }, [projectId]);

  //create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      startLoading();

      const { data } = await taskClient.post(`/${projectId}/tasks`, {
        title,
        description,
        status,
      });

      //add new task to UI
      setTasks([data, ...tasks]);

      //reset form

      setTitle("");
      setDescription("");

      stopLoading();
    } catch (error) {
      setErrorMessage("Failed to create task");
    }
  };

  //  // Loading UI (global spinner)
  if (loading) return <Spinner />;

  // prevent crash
  if (!project) return <p>Loading project...</p>;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/** Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "15px",
          padding: "6px 10px",
          cursor: "pointer",
          border: "1px solid #ccc",
          borderRadius: "6px",
          backgroundColor: "#fff",
        }}
      >
        {" "}
        Back
      </button>

      {/* Project Info Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            fontSize: "clamp(20px, 4vw, 32px)",
          }}
        >
          {project.name}
        </h1>
        <p style={{ color: "#555", lineHeight: "1.5" }}>
          {project.description}
        </p>
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/**create a task Form */}
      <h2 style={{ marginBottom: "10px" }}>Create Tasks</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "25px",
          maxWidth: "500px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          type="text"
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

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          type="text"
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
          Add Task
        </button>
      </form>

      {/** Task List */}
      <h2 style={{ marginBottom: "10px" }}>Tasks</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {tasks.length === 0 ? (
          <p>No tasks for this project</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} style={{ marginBottom: "10px" }}>
              <TaskCard task={task} setTasks={setTasks} projectId={projectId} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default ProjectDetails;
