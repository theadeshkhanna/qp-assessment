require("dotenv").config();
const express = require("express");
const {authRoute} = require("./routes/auth.route");
require("./models/index");

const app = express();
const port = process.env.PORT

app.use(express.json());
app.use("/auth", authRoute);

app.listen(port, () => {
    console.log(`App is up and running at ${port}`);
})