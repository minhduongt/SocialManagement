const createError = require("http-errors");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = err;

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    app.use(function (req, res, next) {
      next(createError(404));
    });
  }
};
