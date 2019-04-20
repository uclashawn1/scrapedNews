var cheerio = require("cheerio");

app.get("/scrape", function(req, res){
    req("https:", function(err, response, html){

    })
    res.send("scrape done")
})

module.exports = app;