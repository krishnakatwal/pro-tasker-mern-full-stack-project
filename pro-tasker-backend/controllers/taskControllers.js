import Task from "../models/Task.js";
import Project from "../models/Project.js";

// Create a task
export const createTask = async (req, res) => {
  try {
    //finds the specific project
    const project = await Project.findOne({_id: req.params.projectId});

    //Check if project exists
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    //Check ownership
    if (project.user.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "Not authorized to create a task" });
    }
    //Create task inside project
    const task = await Task.create({
      ...req.body, //takes everything from the request body and copies it into the object.
      project: req.params.projectId, //adds the project ID from the URL.
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all tasks from a project
export const getTaskByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      //This replaces the project ID with actual project data
      .populate("project");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update task
export const updateTask = async (req, res) => {
  try {
    const task = await Project.findOne({ _id: req.params.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.project.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update the tassk" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      {
        //finds a task only if its ID matches AND it belongs to the given project
        _id: req.params.taskId,
        project: req.params.projectId,
      },
      req.body,
      { new: true },
    );
    res.json(`Task updated: ${updatedTask.title}`);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

//Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.taskId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    //Check ownership
    if (task.project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    //Delete task (only if it belongs to project)
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.taskId,
      project: req.params.projectId,
    });
    res.json(`Task deleted: ${deletedTask.title}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
