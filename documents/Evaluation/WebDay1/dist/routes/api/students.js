"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const db_1 = require("../../db");
const db_2 = require("../../db");
const sequelize_1 = __importDefault(require("sequelize"));
const express_1 = require("express");
const route = express_1.Router();
route.get("/", (req, res) => {
    db_1.Student.findAll()
        .then((students) => {
        res.send(students);
    }).catch((err) => {
        res.send("error");
    });
});
route.post("/", (req, res) => {
    db_1.Student.create({
        name: req.body.name
    }).then((students) => {
        res.send(students);
    }).catch((err) => {
        res.send("error creating students");
    });
});
route.delete('/:id', (req, res) => {
    db_1.Student.destroy({
        where: {
            id: {
                [sequelize_1.default.Op.eq]: req.params.id
            }
        }
    }).then((course) => {
        res.send("The id " + req.params.id + " has been deleted");
    }).catch((err) => {
        res.send("Id invalid");
    });
});
route.get('/:id', (req, res) => {
    db_1.Student.find({
        where: {
            id: {
                [sequelize_1.default.Op.eq]: req.params.id
            }
        }
    }).then((student) => {
        res.send(student);
    }).catch((err) => {
        res.send("Id invalid");
    });
});
route.get('/:id/batches', (req, res) => {
    let ids = [];
    db_2.StudentBatch.findAll({
        where: {
            studentId: req.params.id
        }
    })
        .then((studentBatches) => {
        studentBatches.forEach(element => {
            ids.push(element.batchId);
        });
        db_2.Batch.findAll({
            where: {
                id: ids
            }
        })
            .then((batches) => {
            res.json(batches);
        });
    });
});
module.exports = route;
