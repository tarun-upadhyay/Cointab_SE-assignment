require("dotenv").config();
require("express-async-errors");

const xss = require("xss-clean");
const helmet = require("helmet");
const express = require("express");
var cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db/db.connect");
const ExpressMongoSanitize = require("express-mongo-sanitize");

const userRouter = require("./Routes/user.Route");
const postRouter = require("./Routes/post.Route");

const notFoundMiddleware = require("./Middlewares/not-found");
const errorHandlerMiddleware = require("./Middlewares/error-handler");

const app = express();
var corsOptions = {
  origin: "https://cointab-ass-zeta.vercel.app",
  optionsSuccessStatus: 200,
};
app.use(cors())
app.set("trust proxy", 1);

app.use(helmet());
app.use(xss());
app.use(ExpressMongoSanitize());

app.use(morgan("tiny"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Backend api</h1>`);
});

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};
start();
