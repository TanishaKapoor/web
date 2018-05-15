"use strict";
const db_1 = require("../../db");
const express_1 = require("express");
const route = express_1.Router();
route.get("/", (req, res) => {
    db_1.StudentBatch.findAll()
        .then((carts) => {
        res.send(carts);
    })
        .catch((err) => {
        res.send("Error");
    });
});
route.post("/", (req, res) => {
    db_1.StudentBatch.create({
        studentId: req.body.sid,
        batchId: req.body.bid
    }).then((student) => {
        res.send(student);
    }).catch((err) => {
        res.send(err);
    });
});
module.exports = route;
