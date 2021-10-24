require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const endpoint = process.env.PRISMIC_ENDPOINT;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

const Prismic = require("@prismicio/client");
const PrismicDOM = require("prismic-dom");
const initApi = (req) => {
  return Prismic.getApi(endpoint, { accessToken: accessToken, req });
};

const handleLinkResolver = (doc) => {
  return "/";
};

app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: endpoint,
    linkResolver: handleLinkResolver,
  };

  res.locals.PrismicDOM = PrismicDOM;
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/about", (req, res) => {
  initApi(req).then((api) => {
    api
      .query(Prismic.Predicates.any("document.type", ["metadata", "about"]))
      .then((response) => {
        const { results } = response;
        const [about, metadata] = results;
        res.render("pages/about", { metadata, about });
      });
  });
});

app.get("/collections", (req, res) => {
  res.render("pages/collections");
});

app.get("/detail:id", (req, res) => {
  res.render("pages/detail");
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
