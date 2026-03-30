import "dotenv/config";
import "./config/connection.js";

import express from "express";
import userRoutes from './routes/userRoutes.js'

const app = express();

app.use(express.json());

//Mount routes
app.use('/api/users',userRoutes)

app.get("/", (req, res) => { 
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening on port: http://localhost:${port}`),
);
