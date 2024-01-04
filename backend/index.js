const connect = require('./db')
const express = require('express')
var cors = require('cors')
require('dotenv').config();

connect.connect();

const app = express()
const port = process.env.PORT

app.use(cors(
  {
    origin: ["https://inotebook-rosy.vercel.app"],
    methods:["POST","GET"],
    credentials: true
  }
))
app.use(express.json())

// available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


// app.get('/', (req, res) => {
//   res.send("Shubham's server !")
// })

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("frontend/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   })
// }



app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})

module.exports = app;

