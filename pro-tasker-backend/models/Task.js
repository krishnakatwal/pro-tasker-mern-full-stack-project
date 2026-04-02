import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"], // only these values allowed
    default: "To Do", // default status
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project", // reference to the Project model
    required: true,
    index: true,
  },
});

// Compound index for faster filtering
taskSchema.index({ project: 1, status: 1 });

const Task = mongoose.model("Task", taskSchema);
export default Task;
