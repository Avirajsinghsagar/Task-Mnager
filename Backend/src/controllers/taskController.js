import Task from "../models/Task.js";


// CREATE TASK
export const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      project,
      assignedTo,
      dueDate,
      priority,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
      priority,
      createdBy: req.user._id,
    });

    const populatedTask = await Task.findById(task._id)
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.status(201).json(populatedTask);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// GET TASKS
export const getTasks = async (req, res) => {
  try {

    const {
      status,
      project,
      assignedTo,
    } = req.query;

    let filter = {};

    
    // MEMBER CAN SEE ONLY THEIR TASKS
    if (req.user.role !== "admin") {
      filter.assignedTo = req.user._id;
    }


    // FILTER BY STATUS
    if (status) {
      filter.status = status;
    }


    // FILTER BY PROJECT
    if (project) {
      filter.project = project;
    }


    // FILTER BY ASSIGNED USER
    if (assignedTo) {
      filter.assignedTo = assignedTo;
    }


    const tasks = await Task.find(filter)
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// UPDATE TASK STATUS
export const updateTaskStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = status || task.status;

    const updatedTask = await task.save();

    const populatedTask = await Task.findById(updatedTask._id)
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.json(populatedTask);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// DELETE TASK
export const deleteTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};