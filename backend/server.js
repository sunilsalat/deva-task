const express = require("express");
const { connectDb } = require("./helpers/connectDb");
require("express-async-errors");
const { errorHandlerMiddleware } = require("./middlewares/errorHandler");
const { notFound } = require("./middlewares/notFound");
const app = express();

const AuthRouter = require("./routes/auth");

app.use(express.json());

app.use("/api/v1/auth", AuthRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  await connectDb("mongodb://localhost/mydb")
    .then(() => console.log("connected to db.."))
    .catch((e) => console.log(e));

  app.listen(8080, () => console.log("Server running on 8080..."));
};

start();
