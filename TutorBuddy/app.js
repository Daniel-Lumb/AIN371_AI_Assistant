// app.js

const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const pageRoutes = require("./routes/pageRoutes");

const port = 3000;
const Host = "localhost";


const app = express();

//this is our connection to mongodb if we want to connect to it


mongoose.connect('mongodb://localhost:27017/community_portal',{
  useNewUrlParser: true,  
  useUnifiedTopology: true
})
.then(() =>
console.log('Database connected')
)
.catch(err => console.log('Database not connected'));


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", pageRoutes);

app.listen(port, () => {
  console.log(`Server running on http:${Host}:${port}`);
});
