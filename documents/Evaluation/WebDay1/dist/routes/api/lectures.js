"use strict";
const db_1 = require("../../db");
const express_1 = require("express");
const route = express_1.Router();
route.get("/", (req, res) => {
    db_1.Lecture.findAll()
        .then((lecture) => {
        res.send(lecture);
    }).catch((err) => {
        res.send(err);
    });
});
route.post("/", (req, res) => {
    db_1.Lecture.create({
        name: req.body.name,
        batchId: req.body.bid,
        teacherId: req.body.tid
    }).then((lecture) => {
        res.send(lecture);
    }).catch((err) => {
        res.send("error creating lectures");
    });
});
module.exports = route;
