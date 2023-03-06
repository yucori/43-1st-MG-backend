require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const { appDataSource } = require("./models/data-source");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    await appDataSource.initialize().then(() => console.log("DB Connection"));
    app.listen(PORT, () =>
      console.log(`🥥🥥Server is listening on ${PORT}🥥🥥`)
    );
  } catch (err) {
    console.error(err);
  }
};

start();
