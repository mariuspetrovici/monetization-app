const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const cors = require("cors");
const corsOptions = {
  origin: "*", // Allow requests from this origin
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

dotenv.config();

const app = express();
app.set("query parser", "extended");
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/1.0", require("./routes/users"));
app.use("/api/1.0/courses", require("./routes/courses"));
app.use("/api/1.0/packages", require("./routes/packages"));
app.use("/api/1.0/pages", require("./routes/pages"));
app.use("/api/1.0/subscriptions", require("./routes/subscriptions"));

const PORT = process.env.PORT || 5005;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Testare conexiune
sequelize
  .authenticate()
  .then(() => console.log("Conexiune la baza de date reușită."))
  .catch((err) => console.error("Eroare la conectarea la baza de date:", err));
