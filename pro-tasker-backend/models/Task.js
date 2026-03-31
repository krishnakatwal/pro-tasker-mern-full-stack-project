import mongoose,{Schema} from "mongoose";

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
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
