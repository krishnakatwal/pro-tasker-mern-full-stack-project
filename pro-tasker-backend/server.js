import "dotenv/config";
import "./config/connection.js";
import cors from "cors";

import express from "express";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

//Mount routes
app.use("/api/users", userRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening on port: http://localhost:${port}`),
);
