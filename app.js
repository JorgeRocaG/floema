const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    meta: {
      data: {
        title: "Floema",
        description: "Metadata description.",
      },
    },
  });
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
