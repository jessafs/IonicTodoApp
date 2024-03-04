import axios from "axios";
const base = "http://localhost:4000/api";

const addTodo = async (body: any) => {
  try {
    let { data } = await axios.post(`${base}/todo/addTodo`, body);
    return data.data;
  } catch (error) {
    console.log(error, "Internal server error");
  }
};

const getAllTodo = async () => {
  try {
    let { data } = await axios.get(`${base}/todo/getAllTodo`);
    return data;
  } catch (error) {
    console.log(error, "Internal server error");
  }
};

const deleteTodo = async (id: string) => {
  try {
    let { data } = await axios.post(`${base}/todo/deleteTodo`, { id });
    return data;
  } catch (error) {
    console.log(error, "Internal server error");
  }
};

const updateTodo = async (body: any) => {
  try {
    let { data } = await axios.put(`${base}/todo/updateTodo`, { body });
    return data;
  } catch (error) {
    console.log(error, "Internal server error");
  }
};
const getById = async (id: string) => {
  try {
    let { data } = await axios.post(`${base}/todo/getTodoById`, { id });
    return data;
  } catch (error) {
    console.log(error, "Internal server error");
  }
};

const register = async (body: any) => {
  try {
    let { data } = await axios.post(`${base}/user/signup`, body);
    return data;
  } catch (error) {
    console.log(error, "Internal server error");
  }
};

// const login = async (body:any) => {
//   try {
//     let { data } = await axios.post(`${base}/user/login`, body);
//     return { status: "success", response: data };
//   } catch (error) {
//     console.log(error);
//     let status = error?.response?.status;
//     if (status === 404) {
//       return { status: "failed", msg: "Username not found." };
//     } else if (status === 401) {
//       return { status: "failed", msg: "Incorrect Password." };
//     }
//   }
// };

export default {
  // login,
  register,
  addTodo,
  getAllTodo,
  deleteTodo,
  updateTodo,
  getById,
};
