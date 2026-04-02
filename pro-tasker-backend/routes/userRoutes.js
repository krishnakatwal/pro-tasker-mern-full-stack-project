import express from "express";

import { createUser, loginUser } from "../controllers/userControllers.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

// Register route - POST/api/users/register
router.post("/register", createUser);

// Login route - POST /api/users/login
router.post("/login", loginUser);


//Verify our logged in user's token
router.use(authMiddleware)

//after verification send back the user details (payload)
router.get('/',(req,res) => {
    res.status(200).json(req.user)
})
export default router;
