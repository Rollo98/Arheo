const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  conf = require("./config/index");
var cors = require("cors");

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === "test") {
  mongoose.connect(`${conf.mongoURL}/arheoAppTEST`, { useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true });
} else {
  mongoose.connect(`${conf.mongoURL}/arheoApp`, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
}
const app = express();
app.use(cors());
// const CORS = (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,Accept')
//   next()
// }
// app.use(CORS)

//Middlewares
if (!process.env.NODE_ENV == "test") {
  app.user(morgan("dev"));
}
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
//Routes
app.use("/", require("./routes/users"));
app.use("/archeologist", require("./routes/archeologist"));
app.use("/blog", require("./routes/blog"));
app.use("/gallery", require("./routes/gallery"));

module.exports = app;
