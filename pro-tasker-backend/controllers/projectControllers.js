import Project from "../models/Project.js";

//create a project
export const createProject = async (req, res) => {
  try {
    //creates a new project in the database
    const project = await Project.create({
      ...req.body, //data from the request (req.body)
      user: req.user._id, //the logged-in user’s ID (req.user._id)
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
};

// Get all projects for logged-in user (Dashboard)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).populate(
      "user",
    );
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};
//Get single project
export const getProjectById = async (req, res) => {
  try {
    //finds a single project by its ID and ensures it belongs to the currently logged-in user
    const project = await Project.findOne({
      _id: req.params.id, // which project(identifies the project)
      user: req.user._id, // belongs to which user(verifies ownership)
    });

    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with ${req.params.id} is not found` });
    }
    res.json(project);
  } catch {
    res.status(500).json({ message: "Error fetching project" });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    //Only owner can update
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" });
  }
};

//Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    //Only owner can delete
    if (project.user.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete the Project" });
    }
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    res.json({ message: `Project  ${deletedProject.name}  deleted` });
  } catch {
    res.status(500).json({ message: "Failed to delete project" });
  }
};
