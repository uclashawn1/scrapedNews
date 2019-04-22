var article = require("../models/article.js");
var express = require("express");
var app = express(app);
var note = require("../models/note.js");


module.exports = function (app) {

    //controller route gets unsaved articles - send to handlebars to render index page
    app.get("/", function (req, res) {
        article.find({ saved: false }).sort({ _id: -1 }).limit(30).exec(function (error, data) {
            var hbsObject = {
                article: data
            };
            res.render("index", hbsObject);
            console.log(hbsObject)
        });
    });

    //route to get saved articles - send to saved.handlebars to render saved page
    app.get("/saved", function (req, res) {
        article.find({ saved: true }).populate("note").exec(function (error, article2) {
            var hbsObject = {
                article: article2
            };
            res.render("saved", hbsObject);
            console.log(hbsObject)
        });
    })

    // Route to get all articles from the database
    app.get("/api/getarticles", function (req, res) {
        article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    //Delete all articles
    app.delete("/api/deletearticles/", function (req, res) {
        article
            .remove({})
            .then(function (dbArticle) {
                res.json(dbArticle)
            })
    });

    //Get one article
    app.get("/api/getarticles/:id", function (req, res) {
        article.findOne({ _id: req.params.id })
            .populate("note")
            .exec(function (error, doc) {
                if (error) {
                    console.log(error);
                }
                else {
                    res.json(doc);
                }
            });
    });

    //Delete one article
    app.delete("/api/deletearticle/:id", function (req, res) {
        article
            .remove({ _id: req.params.id })
            .then(function (dbArticle) {
                res.json(dbArticle)
            })
    });


    //Save one article
    app.post("/api/savearticle/:id", function (req, res) {
        article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
            .exec(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(doc);
                }
            });
    });

    //Delete saved article
    app.delete("/api/deletesavearticle/:id", function (req, res) {
        article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
            .exec(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(doc);
                }
            });
    });

    // save one note
    app.get("/api/savenote/:id", function (req, res) {
        var id = req.params.id;
        article.findById(id).populate("note").exec(function (err, data) {
          res.send(data.note);
        })
      })
      
      //Create a new note
      app.post("/api/savenote/:id", function (req, res) {
        //   get form data, save to a variable
        var newNote = new Note({
          body: req.body.text,
          date: req.body.created,
          article: req.params.id
        });
        console.log(req.body)
        newNote.save(function (error, note) {
          if (error) {
            console.log(error);
          } else {
            article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: note } })
            .exec(function (err) {
                if (err) {
                  console.log(err);
                  res.send(err);
                } else {
                  res.send(note);
                }
              });
          }
        });
      });
      
      //Delete a note
      app.delete("/api/deletenote/:id", function (req, res) {
        note
          .remove({ "_id": req.params.id })
          .then(function (dbArticle) {
            res.json(dbArticle)
          })
      });
}







module.exports = app;