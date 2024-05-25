const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db");

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user");
app.use("/user", userRouter);



require("dotenv").config();
const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server: " + err);
  } else {
    console.log("Listening on http://localhost:3000");
  }
});
