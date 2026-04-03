import express from "express";
import { authMiddleware } from "../utils/auth.js";
import {
  createTask,
  getTaskByProject,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";


const router = express.Router();

router.use(authMiddleware);

//Create task POST api/projects/:projectId/tasks
router.post("/:projectId/tasks", createTask);

//Get all tsaks GET api/projects/:projectId/tasks
router.get("/:projectId/tasks", getTaskByProject);

//Update task  PUT api/tasks/:taskId
router.put("/:taskId", updateTask);
// router.put("/:projectId/:taskId", updateTask);

//Delete task DELETE api/task/:taskId
router.delete('/:taskId', deleteTask);
// router.delete("/:projectId/:taskId", deleteTask);

export default router;
