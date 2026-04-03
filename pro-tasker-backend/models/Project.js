import mongoose, {Schema} from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
