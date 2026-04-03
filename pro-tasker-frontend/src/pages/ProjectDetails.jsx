
/**ProjectDetails → full page of one project */
import { useLoading } from "../context/LoadingContext";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectClient, taskClient } from "../clients/api";
import TaskCard from "../components/TaskCard";

function ProjectDetails() {

  const  navigate = useNavigate();
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

      const {data} = await taskClient.post(`/${projectId}/tasks`,{
        title,
        description,
        status
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
  }

  //  // Loading UI (global spinner)
  if (loading) return <Spinner />;

  // prevent crash
  if (!project) return <p>Loading project...</p>;


  return (
    <div  style={{
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    }}>
      {/** Back Button */}
      <button onClick={() => navigate("/")}
       style={{
        marginBottom: "15px",
        padding: "6px 10px",
        cursor: "pointer",
      }}
        >Back</button>

      {/* Project Info */}
      <div style={{ marginBottom: "20px" }}>
      <h1 >{project.name}</h1>
      <p>{project.description}</p>
      </div>
   

      <hr />

      {/**create a task Form */}
      <h2>Create Tasks</h2>
      <form onSubmit={handleSubmit}
       style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
      }}
      >
        <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        type="text" 
        style={{ 
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #ccc",}}
        />

        <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
         type="text" 
        style={{ padding: "8px",
          borderRadius: "8px",
          border: "1px solid #ccc", }}
         />

         <button type="submit"
         style={{
          padding: "8px",
          backgroundColor: "#fecaca",
          border: "none",
          cursor: "pointer",
          borderRadius: "8px",
        }}
         >Add Task</button>

      </form>
       
       {/** Task List */}
       <h2>Tasks</h2>

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
  );
}
export default ProjectDetails