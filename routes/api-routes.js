const path = require("path");
const db = require("../db/db.json");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(db);
  });

  app.post("/api/notes", function (req, res) {
    const note = req.body;

    //id is the where the object is in the array
    const id = db.length;

    //object template for new note
    const newNote = {
      title: note.title,
      text: note.text,
      id: id,
    };
    db.push(newNote);
    res.json(db);
  });

  app.delete("/api/notes/:id", function (req, res) {
    for (let i = 0; i < db.length; i++) {
      // grabbing object from db array
      if (db[i].id == req.params.id) {
        // removing object at selected index
        db.splice(i, 1);
        console.log(db);
      }
    }
    res.json(db);
  });
};
