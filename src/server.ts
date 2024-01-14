import { app } from "./app";
import connectDb from "./config/mongodb";
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log("Alumni is running on port " + process.env.PORT);
  connectDb();
});
