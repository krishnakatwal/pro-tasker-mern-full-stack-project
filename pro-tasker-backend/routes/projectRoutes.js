import express from 'express'
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from "../controllers/projectControllers.js";

import {authMiddleware} from '../utils/auth.js'

const router = express.Router()

//All routes protected
router.use(authMiddleware);

//Create
router.post("/", createProject);   
 // Dashboard (all user projects)    
router.get("/", getProjects);   
// Single project       
router.get("/:id", getProjectById);  
   // Update   
router.put("/:id", updateProject);  
  // Delete 
router.delete("/:id", deleteProject);   

export default router;
