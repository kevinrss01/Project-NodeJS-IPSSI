import express from "express";
import routes from "./routes.js";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "connect-flash";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
//app.use("/addBook", routes);
app.use(express.static("public"));

export default app;
