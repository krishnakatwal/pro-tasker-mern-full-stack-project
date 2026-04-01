import { useEffect, useState } from "react";
import { postClient } from "../clients/api.js";
import ProjectCard from "../components/ProjectCard.jsx";

function Dashboard() {
  const [projects, setProjects] = useEffect([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState;

  useEffect(() => {
    async function getProjects() {
      try {
        //get our project from db
        const { data } = await postClient.get("/");

        //save that in component's state
        setProjects(data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    getProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //make a POST request to create the post (based off the state: title and body)
      const { data } = await postClient.post("/", { name, description });

      //add the new post to our state
      setProjects([data, ...projects]);

      //reset the form
      setName("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <div>
<h1>Dashboard Page</h1>

<form onSubmit="handleSubmit">
  <h2>Leave a Project Here:</h2>

  <label htmlFor="name">Name:</label>

  <input 
  id="name"
  required={true}
  value={name}
  type="name" 
  onChange={(e) => setName(e.target.value)}

  />

  <label htmlFor="description">Description:</label>

  <input 
  type="description"
  id="description"
  required={true}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  
  />

  <button>Submit</button>
</form>
    </div>
  )

}
export default Dashboard;
