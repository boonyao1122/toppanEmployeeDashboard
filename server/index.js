require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./sequelize/models/index.js");
const bodyParser = require("body-parser");
const router = require("./routes/index.js");

const PORT = process.env.PORT || 3001;

const app = express();

// //STATIC FOLDER
// app.use(express.static(path.join(__dirname, "../client/build.js")));

// Middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());

db.sequelize
  .sync({ logging: false })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
