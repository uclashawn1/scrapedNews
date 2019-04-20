var mongoose = require("mongoose");

// save schema reference
var schema = mongoose.Schema;

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
    }
    saved: {
        type: Boolean,
        required: false
    },
    note: [{
        type: schema.Types.objectId,
        ref: "note"
    }]
});

var article = mongoose.model("article", articleSchema);

module.exports = article;