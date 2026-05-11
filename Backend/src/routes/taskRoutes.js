import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    createTask,
    deleteTask,
    getTasks,
    updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.put("/:id", protect, updateTaskStatus);

router.delete("/:id", protect, deleteTask);

export default router;