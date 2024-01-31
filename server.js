require("dotenv").config();
const express = require("express");
require("./models/index");
const { indexRouter } = require("./routes/index.route");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api", indexRouter);

app.listen(port, () => {
  console.log(`App is up and running at ${port}`);
});
