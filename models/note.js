var mongoose = require("mongoose");

var Schema =mongoose.Schema;

var noteSchema = new Schema({
    body: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "article"
    }
})

var Note = mongoose.model("note", noteSchema);

module.exports = note;