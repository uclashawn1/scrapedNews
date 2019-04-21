var mongoose = require("mongoose");

// save schema reference
var schema = mongoose.Schema;
// Using Schema constructor to create a new userSchema object
var articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        required: false
    },
//note object below stores a note's id by using ref property to
//link the ObjectId to the note model which will be used to 
//populate an article with its associated note
    note: [{
        type: Schema.Types.objectId,
        ref: "note"
    }]
});

var article = mongoose.model("article", articleSchema);

module.exports = article;