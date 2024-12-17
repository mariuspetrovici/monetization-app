const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");

const { sequelize } = require("./models");
const courseRoutes = require("./routes/coursesRoute_MVC");
const pagesRoutes = require("./routes/pagesRoute_MVC");

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

dotenv.config();

const app = express();
app.set("query parser", "extended");
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/1.0", require("./routes/users"));
app.use("/api/1.0/courses", require("./routes/courses"));
app.use("/api/1.0/pages", require("./routes/pages"));
app.use("/api/1.0/subscriptions", require("./routes/subscriptions"));

const PORT = process.env.PORT || 5005;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// app.use("/", pagesRoutes);
// app.use("/courses", courseRoutes);
app.use(express.static(path.join(__dirname, "public")));

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
