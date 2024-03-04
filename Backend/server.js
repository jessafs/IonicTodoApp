const express = require('express')
const todoRoutes = require("./routes/todoRoutes")
const userRoutes = require('./routes/userRoutes')
const app = express()
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000
const db = require("./database/init");
const cors = require("cors")
const dotenv = require('dotenv')

dotenv.config();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
db.connect()
app.use("/api/todo",todoRoutes)
app.use("/api/user",userRoutes)
app.get("/", (req, res) => {
    res.send("Express + Javascript Server");
  });

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})
