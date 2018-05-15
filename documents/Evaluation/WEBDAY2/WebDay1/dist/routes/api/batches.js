"use strict";
const db_1 = require("../../db");
const express_1 = require("express");
const route = express_1.Router();
route.get("/", (req, res) => {
    db_1.Batch.findAll()
        .then((carts) => {
        res.send(carts);
    })
        .catch((err) => {
        res.send("Error");
    });
});
route.post("/", (req, res) => {
    db_1.Batch.create({
        name: req.body.name,
        courseId: req.body.courseId
    }).then((batch) => {
        res.send(batch);
    }).catch((err) => {
        res.send("Error creating batches ");
    });
});
module.exports = route;
