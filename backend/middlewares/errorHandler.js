const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode).json({ msg: err.message });

  next();
};

module.exports = { errorHandlerMiddleware };
