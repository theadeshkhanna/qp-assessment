require("dotenv").config();
const express = require("express");
const { authRoute } = require("./routes/auth.route");
require("./models/index");
const { categoryRouter } = require("./routes/category.route");
const { groceryRouter } = require("./routes/grocery.route");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/auth", authRoute);
app.use("/category", categoryRouter);
app.use("/grocery", groceryRouter);

app.listen(port, () => {
  console.log(`App is up and running at ${port}`);
});
