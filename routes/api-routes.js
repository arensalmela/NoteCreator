const path = require("path");
const db = require("../db/db.json");
const fs = require("fs");
module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(db);
  });

  app.post("/api/notes", function (req, res) {
    const note = req.body;
    const id = db.length;
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
      console.log(db[i].id, "Object id");
      console.log(req.params.id, "Requested delete");
      if (db[i].id == req.params.id) {
        db.splice(i, 1);
        console.log(db);
      }
    }
    res.json(db);
  });
};
