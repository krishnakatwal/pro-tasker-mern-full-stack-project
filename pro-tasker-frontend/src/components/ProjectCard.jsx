/**ProjectCard → preview of a project*/


import { useState } from "react";
import { projectClient } from "../clients/api";
import { useNavigate } from "react-router-dom";


function ProjectCard({ project,setProjects }) {

  // console.log("Project data:", project);

  const [status, setStatus] = useState(project?.status || "");
  const [isEditing, setEditing] =useState(false)
  const [name, setName] = useState(project?.name || "")
  const [description,setDescription] = useState(project?.description || "")

  const navigate = useNavigate()

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
      console.error(error)
    alert("Failed to update project")
    
      
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
     console.error(error)
    alert("Failed to delete project")
    
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
    console.error(error)
    // alert("Failed to delete task")
    
    }
  };

  return (
    <div
    
      style={{ 
        border: "1px solid #ddd", 
        padding: "16px", 
        borderRadius: "8px" ,
         marginBottom: "12px",
         backgroundColor: "#fff",
      }}
    >
      {/** project Info */}

      {/* Header */}
      {/** clickable titile */}
      <h3
      onClick={() => {
        console.log("clicked:",project._id);
         navigate(`/projects/${project._id}`)}}

      style={{
        cursor: "pointer",
         color:"blue",
         marginBottom: "8px",}}
      >{project.name}</h3>

      {/* Body */}
      <p style={{ marginBottom: "8px" }}>{project.description || "No description provided"}</p>
      

      <small
      style={{ display: "block",
         marginBottom: "10px", 
         color: "#666" }}
      >Created: {new Date(project.createdAt).toLocaleDateString()}</small>

      {/** status */}
      <select value={status} onChange={handleStatusChange}
      style={{
        padding: "4px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        marginBottom: "10px",
      }}
      >
        <option value="pending">Pending</option>
        <option value="In-Progress">In-Progress</option>
        <option value="completed">completed</option>

      </select>

    

      {/* Actions */}
      <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
        <button onClick={() => setEditing(true)}
        style={{
          padding: "6px 10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
          >Edit</button>
        <button onClick={handleDelete}
        style={{
          padding: "6px 10px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#fecaca",
          cursor: "pointer",
        }}
        >Delete</button> 
      </div>

      {/** Simple Edit Form */}
      {isEditing && (
        <div style={{ marginTop: "12px" }}>
          <h4 style={{ marginBottom: "8px" }}>Edit Project</h4>

          <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text" 
           style={{
            display: "block",
            width: "100%",
            padding: "6px",
            marginBottom: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          />

          <textarea 
          value={description}
          onChange={(e)=> setDescription(e.target.value)}
          placeholder="Description"
          style={{
            display: "block",
            width: "100%",
            padding: "6px",
            marginBottom: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handleUpdate}
          style={{
              padding: "6px 10px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#fecaca",
              cursor: "pointer",
            }}
          >Save</button>
          <button onClick={()=> setEditing(false)}
          style={{
              padding: "6px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
            >cancel</button>
          </div>
            
         
        </div>
      )}

    </div>
  );
}
export default ProjectCard;
