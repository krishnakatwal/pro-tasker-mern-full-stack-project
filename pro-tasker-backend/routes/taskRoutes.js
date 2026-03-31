import express from "express";
import {
  createTask,
  getTaskByProject,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

//Create task POST api/projects/:projectId/tasks
router.post("/:projectId/tasks", createTask);

//Get all tsaks GET api/projects/:projectId/tasks
router.get("/:projectId/tasks", getTaskByProject);

//Update task  PUT api/tasks/:taskId
router.put("/:taskId", updateTask);

//Delete task DELETE api/task/:taskId
router.delete('/:taskId"', deleteTask);

export default router;
