
/**ProjectDetails → full page of one project */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectClient, taskClient } from "../clients/api";
import TaskCard from "../components/TaskCard";

function ProjectDetails() {
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
      const {data} = await projectClient.post(`/${projectId}/tasks`,{
        title,
        description
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

  return (
    <div>
      {/* Project Info */}
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <hr />

      {/**create a task Form */}
      <h2>Tasks</h2>
      <form onSumnit={handleSubmit}>
        <input 
        value={title}
        onChange={(e) => (e.target.value)}
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
        <ul>
          {tasks.map((task)=> (
            <li key ={task._id}>
              <strong>{task.title}</strong> -{task.description}
            </li>
          ))}
         </ul>
      )}
    </div>
  );
}
