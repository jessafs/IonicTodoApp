const todoServices = require("../services/todoServices");

exports.addTodo = async (req, res) => {
  try {
    const todo = req.body;
    if (todo) {
      const addTodo = await todoServices.addTodo(todo);
      return res.json({ data: addTodo, msg: "success" });
    } else {
      return res.json({ msg: "error" });
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

exports.getAllTodo = async (req, res) => {
  try {
    const getAllTodo = await todoServices.getAllData();
    const { data, code, msg } = getAllTodo;
    return res.json({ data, code, msg });
  } catch (error) {
    return res.json({ error: error });
  }
};

exports.deleteTodoId = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const deleteTodoId = await todoServices.deleteTodo(id);
      const { data, msg, code } = deleteTodoId;
      return res.json({ data, msg, code });
    } else {
      return res.json({ code: 401, msg: "Bad Request" });
    }
  } catch (error) {
    return res.json({ error: error });
  }
};
exports.deleteAll = async (req, res) => {
  try {
    const { code, data } = await todoServices.deleteAll();
    return response(res, code, data);
  } catch (error) {
    return response(res, codes.INTERNAL_SERVER_ERROR, error);
  }
};

exports.updateTodoId = async (req, res) => {
  try {
    const params = req.body;
    if (params) {
      const updateTodo = await todoServices.updatetodo(params);
      const { data, code, msg } = updateTodo;
      return res.json({ data, code, msg });
    } else {
      return res.json({ code: 401, msg: "Bad Request" });
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

exports.getTodoById = async (req,res) => {
  try {
    const {id} = req.body
    if(id){
      const getById = await todoServices.getTodoById(id)
      return res.json({ data: getById, msg: "Retrieve Successfully" });
    } else {
      return res.json({ msg: "Bad Request" });
    }
  } catch (error) {
    return res.json({ data: error, msg: "Internal server error" });
  }
};
