/**ProjectCard → preview of a project*/


import { useState } from "react";
import { projectClient } from "../clients/api";


function ProjectCard({ project,setProjects }) {

  // console.log("Project data:", project);

  const [status, setStatus] = useState(project?.status || "");
  const [isEditing, setEditing] =useState(false)
  const [name, setName] = useState(project?.name || "")
  const [description,setDescription] = useState(project?.description || "")

  //update project
  const handleUpdate = async () => {
    console.log("save Cliocked")
  
    try {
    const { data } = await projectClient.put(`/${project._id}`, {
       name,
      description,
      status,
    });

      setProjects((prev)=>
        prev.map((p) => (p._id === project._id ? data: p))
    )
      
    setEditing(false)
    } catch (error) {
      console.log(error)
      
    }
  }
 
  //Delete Project
  const handleDelete = async () => {
    if(!window.confirm("Delete this projects"))
      return

    try {
      await projectClient.delete(`/${project._id}`)

      setProjects((prev) => 
      prev.filter((p) => p._id !== project._id))

    } catch (error) {
      console.log(error)
    }
  }


    // Change status
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      const { data } = await projectClient.put(`/${project._id}`, {
        status: newStatus,
      });

      setProjects((prev) =>
        prev.map((p) => (p._id === project._id ? data : p))
      );
    } catch (e) {
      // setError(e.response?.data?.message || "Status update failed");
      console.log(e)
    }
  };

  return (
    <div
    
      style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}
    >
      {/** project Info */}

      {/* Header */}
      <h3>{project.name}</h3>

      {/* Body */}
      <p>{project.description || "No description provided"}</p>
      

      <small>Created: {new Date(project.createdAt).toLocaleDateString()}</small>

      {/** status */}
      <select value={status} onChange={handleStatusChange}>
        <option value="pending">Pending</option>
        <option value="In-Progress">In-Progress</option>
        <option value="completed">completed</option>

      </select>

    

      {/* Actions */}
      <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
        <button onClick={() => setEditing(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button> 
      </div>

      {/** Simple Edit Form */}
      {isEditing && (
        <div>
          <h4>Edit Project</h4>

          <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text" 
          />

          <textarea 
          value={description}
          onChange={(e)=> setDescription(e.target.value)}
          placeholder="Description"
          />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={()=> setEditing(false)}>cancel</button>
            
         
        </div>
      )}

    </div>
  );
}
export default ProjectCard;
