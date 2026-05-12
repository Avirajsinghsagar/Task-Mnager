import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import Project from "../models/Project.js";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {

  try {

    const totalProjects = await Project.countDocuments({
      user: req.user.id,
    });

    const totalTasks = await Task.countDocuments({
      user: req.user.id,
    });

    const completedTasks = await Task.countDocuments({
      user: req.user.id,
      status: "completed",
    });

    const todoTasks = await Task.countDocuments({
      user: req.user.id,
      status: "todo",
    });

    res.json({
      totalProjects,
      totalTasks,
      completedTasks,
      todoTasks,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;