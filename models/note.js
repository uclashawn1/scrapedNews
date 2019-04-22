var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var noteSchema = new Schema({
  // `title` is of type String
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
});

// This creates our model from the above schema, using mongoose's model method
var note = mongoose.model("note", noteSchema);

// Export the Note model
module.exports = note;