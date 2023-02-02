import mongoose from "mongoose";
import app from "./index.js";

const localUri = "mongodb://localhost:27017/kevin";

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

const connect = async () => {
  try {
    await mongoose.connect(localUri);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.error("error:" + error);
  }
};

connect();
