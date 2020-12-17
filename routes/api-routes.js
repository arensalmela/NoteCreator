// Collaborated with https://github.com/ReindeerCode & https://github.com/smanter82

const db = require("../db/db.json");
const fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (err, data) {
      if (err) throw err;
      let allNotes = JSON.parse(data);
      return res.json(allNotes);
    });
  });

  app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (err, data) {
      if (err) throw err;
      let allNotes = JSON.parse(data);
      const note = req.body;

      //id is the where the object is in the array
      const id = db.length + 1;

      //object template for new note
      const newNote = {
        title: note.title,
        text: note.text,
        id: id,
      };

      allNotes.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), (err) => {
        if (err) throw err;
      });
      res.json(db);
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    const deleteNote = req.params.id;
    fs.readFile("./db/db.json", function (err, data) {
      if (err) throw err;
      let allNotes = JSON.parse(data);
      function findNote(deleteNote, allNotes) {
        for (let i = 0; i < allNotes.length; i++) {
          if (allNotes[i].id == deleteNote) {
            // removing object at selected index
            allNotes.splice(i, 1);
          }
        }
      }

      findNote(deleteNote, allNotes);
      fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), (err) => {
        if (err) throw err;
      });
    });

    res.json(db);
  });
};
