import express from "express";
import Task from "../models/task";
import authMiddleware from "../middleware/authmiddleware";

const router = express.Router();

router.post("/", authMiddleware, async (req: any, res: any) => {
  try {
    const task = new Task({ ...req.body, userId: req.userId });
    await task.save();
    res.json(task);
  } catch (err) {
    console.log("Error creating task", err);
  }
});

router.get("/", authMiddleware, async (req: any, res: any) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    console.log("Error Fetching task", err);
  }
});

router.put("/:id", authMiddleware, async (req: any, res: any) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    console.log("Error Updating task", err);
  }
});

router.delete("/:id", authMiddleware, async (req: any, res: any) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.log("Error deleting task", err);
  }
});

export default router;
