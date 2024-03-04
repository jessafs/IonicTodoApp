const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
})

const Todo = mongoose.model("Client", todoSchema);

module.exports = Todo;
