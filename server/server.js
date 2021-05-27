const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 5000;

const userRouter = require("./routes/user");

const { errorHandler } = require("./utils/middlewares");

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
