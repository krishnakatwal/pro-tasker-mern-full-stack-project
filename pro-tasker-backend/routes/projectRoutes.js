import express from 'express'
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from "../controllers/projectControllers.js";

import {authMiddleware} from '../utils/auth.js'

const router = express.Router()

//All routes protected
router.use(authMiddleware);

//Create- POST/api/projects
router.post("/", createProject);   

 // Dashboard (all user projects) - GET /api/projects  
router.get("/", getProjects);   

// Single project - GET /api/projects/:id     
router.get("/:id", getProjectById);  

   // Update - PUT /api/projects/:id 
router.put("/:id", updateProject);  

  // Delete - DELETE /api/projects/:id
router.delete("/:id", deleteProject);   

export default router;
