// middleware/errorHandler.js
// Global Express error handler — never leaks internals

function errorHandler(err, req, res, next) {
  console.error("[ERROR]", err.message);

  res.status(err.status || 500).json({
    error: err.message || "An unexpected error occurred.",
  });
}

module.exports = { errorHandler };
