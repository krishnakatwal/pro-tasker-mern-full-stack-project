
/**ProjectDetails → full page of one project */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectClient, taskClient } from "../clients/api";
import TaskCard from "../components/TaskCard";

function ProjectDetails() {

  const  navigate = useNavigate();
  //grabs the id from the URL.
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  //Fetch the existing data when the page loads - project and tasks
  useEffect(() => {
    async function fetchProjectAndTasks() {
      try {
        //We get the data and rename it to projectData immediately.
        // Fetch project
        const { data: projectData } = await projectClient.get(`/${projectId}`);
        setProject(projectData);

        // Fetch tasks for this project
        const { data: taskData } = await taskClient.get(`/${projectId}/tasks`);
        setTasks(taskData);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }
    fetchProjectAndTasks();
  }, [projectId]);

  //create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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


    } catch (error) {
      console.error("Failed to creating task",error)
    }
  }
  // prevent crash
  if (!project) return <p>Loading project...</p>;


  return (
    <div>
      {/** Back Button */}
      <button onClick={() => navigate("/")}>Back</button>
      {/* Project Info */}
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <hr />

      {/**create a task Form */}
      <h2>Create Tasks</h2>
      <form onSubmit={handleSubmit}>
        <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        type="text" />

        <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
         type="text" />

         <button type="submit">Add Task</button>

      </form>
       
       {/** Task List */}
       <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks for this project</p>
      ) : (
        
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} setTasks={setTasks} projectId={projectId} />

          ))

          )}
        
      
    </div>
  );
}
export default ProjectDetails