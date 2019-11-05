const mongoist = require("mongoist");
const db = mongoist("mongodb://localhost:27017/development");


module.exports = db;
