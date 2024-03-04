const Todo = require("../models/todoModels");
exports.addTodo = async (todo) => {
  try {
    let addTodo = await Todo.create(todo);
    if (addTodo === null) {
      return { code: 422, msg: "Unprocessable request" };
    } else {
      return { code: 201, msg: "Created", data: addTodo };
    }
  } catch (error) {
    return { code: 500, msg: "Internal Server Error", data: error };
  }
};

exports.getAllData = async () => {
  try {
    let getAllData = await Todo.find({});
    if (Object.keys(getAllData).length === 0) {
      return { code: 204, msg: "No Content" };
    } else {
      return { code: 200, msg: "OK", data: getAllData };
    }
  } catch (error) {
    return { code: 500, msg: "Internal Server Error", data: error };
  }
};

exports.deleteTodo = async (id) => {
  try {
    let deleteTodoId = await Todo.findByIdAndDelete({ _id: id });
    if (deleteTodoId === null) {
      return { code: 404, msg: "Not found" };
    } else {
      return { code: 200, msg: "OK", data: deleteTodoId };
    }
  } catch (error) {
    return { code: 500, msg: "Internal Server Error", data: error };
  }
};
exports.deleteAll = async () => {
  try {
    const deleteAllRelease = await Todo.deleteMany({});
    return { code: codes.OK, data: deleteAllRelease };
  } catch (error) {
    return { code: codes.INTERNAL_SERVER_ERROR, data: error };
  }
};

exports.updatetodo = async (params) => {
  try {
    let updateTodo = await Todo.findByIdAndUpdate(params.body._id, params.body, {
      new: true,
    });
    if(updateTodo === null){
      return {code:404, msg: "Not found"}
    }else{
      return {code: 200,msg:"ok", data:updateTodo}
    }
  } catch (error) {
    return { data: error, code: codes.INTERNAL_SERVER_ERROR };
  }
};

exports.getTodoById = async(id)=>{
  try {
    let getById = await Todo.findById(id)
    if (getById === null) {
      return { msg: "Not found" };
    } else {
      return { msg: "Success", data: getById };
    }
  } catch (error) {
    return { msg: "Internal server error" };
  }
}
