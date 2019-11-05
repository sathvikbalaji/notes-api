const express = require("express");
const bodyParser = require("body-parser");
const db = require("./utils/db");
const mongoist = require("mongoist");

const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  const notesPromise = db.notes.find();
  notesPromise.then((notes) => {
    res.json({"Notes": notes});
  });
});


app.get('/note/:id', (req, res) => {
  const id = req.params.id;
  const idPromise = db.notes.find({"_id": mongoist.ObjectId(id)});
  idPromise.then((notesWithID) =>{
    res.json({"Notes with id": notesWithID});
  });
});

app.post('/note', (req,res) => {
  const body = req.body;
  const insertPromise = db.notes.insert(body);
  insertPromise.then((body) => {
    res.json(body);
  });
});

app.delete('/note/:id', (req, res) => {
  const id = req.params.id;
  const idPromise = db.notes.remove({"_id": mongoist.ObjectId(id)});
  idPromise.then((notesWithID) =>{
    res.json({"Notes with id": notesWithID});
  });
});


app.listen(3000);
