const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "../client/build")));
// parse application/json
app.use(bodyParser.json());
// Connecting to MongoDB database.
mongoose.connect('mongodb+srv://admin-peter:"Password"@cluster0.kulrb.mongodb.net/keeper').
catch(error => handleError(error));

// Defining:
const Schema = mongoose.Schema;
// Schema
const notesSchema = { title: String, content: String }
// Model
const Note = mongoose.model("Note", notesSchema);

app.get("/notes", (req, res) => {
    //Find all notes.
    Note.find({}, function (err, foundNotes) {
        if (err) {
            console.log(err);
        } else {
            res.json(foundNotes);
        }

    });

});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });

app.post("/create", function (req, res) {
    const noteItem = req.body;

    const note = new Note({ title: noteItem.title, content: noteItem.content });
    //Saves this document into the database.
    note.save();

    res.json({ message: "File is successfully saved to note DB" });
});

app.post("/delete", function (req, res) {
    const noteId = req.body.id;

    Note.findByIdAndRemove(noteId, (err) => {
        if (err) {
            console.log(err);
            res.json({ message: "Error in deleting note from DB: " + err })

        } else {
            console.log("Successfully deleted note from DB");
            res.json({ message: "File is successfully deleted from DB" })
        }
    });
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

app.listen(port, function() {
  console.log("Server has started on port successfuly.");
});
