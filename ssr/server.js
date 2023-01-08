const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const axios = require("axios");
const PORT = 8080;
const app = express();
const homeSeo = (req, res) => {
  const filePath = path.resolve(__dirname, "../frontend/dist", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.send("something went wrong while serving this page :(");
    }

    data = data
      .replace(
        /__TITLE__/g,
        " Kottarakara News | Get updated quickly with latest news and events from Kerala | Kottarakkara News"
      )
      .replace(
        /__DESCRIPTION__/g,
        "Get updated quickly with the latest news, specials and events from Kerala with Kottarakara News and get update with Latest Malayalam news too"
      )
      .replace(
        /__OG_TITLE__/g,
        " Kottarakara News | Get updated quickly with latest news and events from Kerala | Kottarakkara News"
      )
      .replace(
        /__OG_DESCRIPTION__/g,
        "Get updated quickly with the latest news, specials and events from Kerala with Kottarakara News and get update with Latest Malayalam news too"
      )
      .replace(/__URL__/g, "https://kottarakkaranews.com")
      .replace(/__TYPE__/g, "website");
    res.send(data);
  });
};
const getImgUrl = async (url) => {
  const ytUrl = await axios.get(url);
  let str = ytUrl.data.split(`<meta property="og:image" content="`)[1];
  const u = str.split(`">`)[0];
  return u;
};
const postSeo = (req, res) => {
  let result = {};
  const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  axios
    .get(process.env.API_URL + req.params.id)
    .then((res) => (result = res.data.data))
    .then(() => {
      const filePath = path.resolve(
        __dirname,
        "../frontend/dist",
        "index.html"
      );
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          return res.send("something went wrong while serving this page :(");
        }
        let yt = "https://www.youtube.com/watch?v=";

        if (result.format === "embed") {
          let id = result.file.split("/embed/")[1];
          yt = yt + id;
        }
        if (result.format === "embed") {
          const s = getImgUrl(yt).then((r) => {
            data = data
              .replace(/__TITLE__/g, result.titleMal)
              .replace(/__DESCRIPTION__/g, result.newsContent)
              .replace(/__OG_TITLE__/g, result.titleMal)
              .replace(/__OG_DESCRIPTION__/g, result.newsContent)
              .replace(/__URL__/g, url)
              .replace(/__TYPE__/g, "article")
              .replace(/__AUTHOR__/g, result.author)
              .replace(/__POSTED_AT__/g, result.postedAt)
              .replace(
                /__FILE_URL_IMAGE__/g,
                result.format === "embed"
                  ? r
                  : process.env.FILE_URL + result.file
              )
              .replace(
                /__FILE_URL_VIDEO__/g,
                result.format === "embed"
                  ? yt
                  : process.env.FILE_URL + result.file
              )
              .replace(
                result.type === "image"
                  ? /__IMAGE_FORMAT__/g
                  : /__VIDEO_FORMAT__/g,
                result.format
              )
              .replace(/__KEYWORDS__/g, result.tags.toString());
            res.send(data);
          });
        } else {
          data = data
            .replace(/__TITLE__/g, result.titleMal)
            .replace(/__DESCRIPTION__/g, result.newsContent)
            .replace(/__OG_TITLE__/g, result.titleMal)
            .replace(/__OG_DESCRIPTION__/g, result.newsContent)
            .replace(/__URL__/g, url)
            .replace(/__TYPE__/g, "article")
            .replace(/__AUTHOR__/g, result.author)
            .replace(/__POSTED_AT__/g, result.postedAt)
            .replace(/__FILE_URL_IMAGE__/g, process.env.FILE_URL + result.file)
            .replace(
              /__FILE_URL_VIDEO__/g,
              result.format === "embed"
                ? yt
                : process.env.FILE_URL + result.file
            )
            .replace(
              result.type === "image"
                ? /__IMAGE_FORMAT__/g
                : /__VIDEO_FORMAT__/g,
              result.format
            )
            .replace(/__KEYWORDS__/g, result.tags.toString());
          res.send(data);
        }
      });
    })
    .catch((err) => console.log(err));
};
app.get("/", homeSeo);
app.get("/local-news/:slug/:id", postSeo);
app.get("/national-news/:slug/:id", postSeo);
app.get("/international-news/:slug/:id", postSeo);
app.get("/news-updates/:slug/:id", postSeo);
app.get("/life-style/:slug/:id", postSeo);
app.get("/travel/:slug/:id", postSeo);
app.get("/obituary/:slug/:id", postSeo);
app.get("/tech/:slug/:id", postSeo);
app.get("/sports/:slug/:id", postSeo);
app.get("/entertainment/:slug/:id", postSeo);
app.use(express.static(path.resolve(__dirname, "../frontend/dist/")));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
