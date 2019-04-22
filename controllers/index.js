var article = require("../models/article.js");
var cheerio = require("cheerio");
var request = require('request');
module.exports = function (app) {

    //Scrape articles
    app.get("/scrape", function (request, res) {
        request("https://www.huffpost.com/impact/business/", function (error, response, result) {
            if(error) {
                throw err;
            } else {
            var $ = cheerio.load(response);
            $(".card__content").each(function (i, element) {
                var result = {};

                result.title = $(this)
                    .children(".card__details").children(".card__headlines").children(".card__headline").children(".card__link").children(".card__headline__text")
                    .text();

                result.summary = $(this)
                    .children(".card__details").children(".card__headlines").children(".card__description")
                    .text();

                result.image = $(this)
                    .children("a").children(".card__image").children("img")
                    .attr("src")

                result.link = $(this)
                    .children(".card__details").children(".card__headlines").children(".card__description").children("a")
                    .attr("href")

                article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });
            res.send("Scrape Done");
                    } 
        });
    });
}