const errorMiddleware = require("./middlewares/error");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const initApiRoute = require("./routes/api");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// middlewares
app.use((req, res, next) => {
  console.log(`Request method ${req.method} to: `, req.path);
  next();
});
// middleware to handle errors

app.use("/", indexRouter);

// apis
initApiRoute(app);

// middlewares to handle errors
app.use(errorMiddleware);

module.exports = app;
