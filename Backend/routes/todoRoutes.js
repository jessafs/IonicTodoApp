const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todoControllers");

router.post("/addTodo", todoControllers.addTodo);
router.get("/getAllTodo", todoControllers.getAllTodo);
router.post("/deleteTodo", todoControllers.deleteTodoId);
router.put("/updateTodo", todoControllers.updateTodoId);
router.post("/getTodoById",todoControllers.getTodoById)
router.delete("/deleteAll",todoControllers.deleteAll)

module.exports = router;
