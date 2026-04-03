
/**TaskCard → individual task UI inside ProjectDetails */

import { useState, useEffect } from "react";
import { taskClient } from "../clients/api";

function TaskCard({ task,setTasks,projectId }) {

  const [status, setStatus] = useState(task?.status || "");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  const date = task?.createdAt ? new Date(task.createdAt): null;

  //// Sync local status when task changes
  useEffect(() => {
    setStatus(task?.status || "")
  },[task])

   if (!task) return null;

  const handleDelete = async () => {
  if(!window.confirm(" Do you want  to delete this task?"))
    return ;

  try {
     console.log("Deleting task:", task._id);

    const res = await taskClient.delete(`/${task._id}`);
    // taskClient.delete(`/${projectId}/${task._id}`);
      console.log("Delete response:", res);

    setTasks((prev) => prev.filter((taskitem)=> taskitem._id !== task._id));

    
  } catch (error) {
    console.error(error)
    alert("Failed to delete task")

  }
}

const handleStatusChange = async (e) => {
  const newStatus = e.target.value;
  setStatus(newStatus);

  //UI update
  setTasks((prev) => 
    prev.map((taskitem) =>
      taskitem._id === task._id ?{...taskitem, status: newStatus} : taskitem
    )
  )


  try {
    const {data} = await taskClient.put(`/${task._id}`,{status: newStatus })
    // taskClient.put(`/${projectId}/${task._id}`, { status: newStatus });

    setTasks((prevTasks) => 
    prevTasks.map((taskitem) => 
    taskitem._id === task._id ? data: taskitem
  )
    )
    
  } catch (error) {
    console.error(error)
    alert("Failed to update status")
    
  }
}
const handleEdit = () => {
  setIsEditing(true);
};

const handleUpdate = async () => {
  try {
    const { data } = await taskClient.put(`/${task._id}`, {
      title,
      description,
      status,
    });

    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? data : t))
    );

    setIsEditing(false);
  } catch (error) {
    console.error(error);
    alert("Failed to update task");
  }
};

if(!task) return null;



  // return (
  //   <div
  //     style={{
  //       border: "1px solid #ccc",
  //       padding: "12px",
  //       borderRadius: "8px",
  //       marginBottom: "10px",
  //       backgroundColor: "#f9f9f9",
  //     }}
  //   >
     
  //     <h4>{task.title}</h4>
  //     <p>{task.description || "No description provided"}</p>

  //    {/** Action Row */}
  //     <div style={{display: "flex", alignItems: "center", gap:"10px"}}>
  //        {/**status dropDown */}
  //     <select value={status} onChange={handleStatusChange} >
     
  //       <option value="To Do">To Do</option>
  //       <option value="In Progress">In-Progress</option>
  //       <option value="Done">Done</option>
        
  //     </select>
  //     {/* Edit Button*/}
  //     <button>Edit</button>


  //     {/** Delete Button */}
  //     <button onClick={handleDelete}>Delete</button>
  //    </div>
      
  //     {/* Created Date */}
  //     <div style={{marginTop: "12PX", fontSize:"12PX", color:"#666"}}>
  //      <big>
  //       Created: {new Date(task.createdAt).toLocaleDateString()}
  //     </big>
  //     </div>
  //     <div>
  //       {/* project: {task ?.project?.name || "-"} */}
  //     </div>

    
  //   </div>
  // );

return (

   <div style={{ border: "1px solid #ccc", padding: "12px", borderRadius: "8px", marginBottom: "10px" }}>

    {isEditing ? (
      <>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />

        <div style={{ marginTop: "10px" }}>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </>
    ) : (
      <>
        <h4>{task.title}</h4>
        <p>{task.description || "No description provided"}</p>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select value={status} onChange={handleStatusChange}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>

        <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </>
    )}
  </div>
);



  
}

export default TaskCard;