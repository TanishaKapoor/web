"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const db_1 = require("../../db");
const sequelize_1 = __importDefault(require("sequelize"));
const express_1 = require("express");
const route = express_1.Router();
route.get("/", (req, res) => {
    db_1.Teacher.findAll()
        .then((teachers) => {
        res.send(teachers);
    }).catch((err) => {
        res.send("error");
    });
});
route.post("/", (req, res) => {
    db_1.Teacher.create({
        name: req.body.name,
        subjectId: req.body.subjectId
    }).then((teachers) => {
        res.send(teachers);
    });
});
route.get('/:id', (req, res) => {
    db_1.Teacher.find({
        where: {
            id: {
                [sequelize_1.default.Op.eq]: req.params.id
            }
        }
    }).then((teacher) => {
        res.send(teacher);
    }).catch((err) => {
        res.send("Id invalid");
    });
});
route.delete('/:id', (req, res) => {
    db_1.Teacher.destroy({
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
route.get("/:id/batches", (req, res) => {
    db_1.Teacher.find({
        where: {
            id: {
                [sequelize_1.default.Op.eq]: req.params.id
            }
        }
    }).then((teache) => {
        db_1.Subject.find({
            where: {
                id: teache.subjectId
            }
        }).then((subject) => {
            if (subject.length == 0)
                res.send("no related data");
            db_1.Batch.findAll({
                where: {
                    courseId: subject.courseId
                }
            }).then((batch) => {
                res.send(batch);
            });
        });
    }).catch((err) => {
        res.send("Invalid Id");
    });
});
route.get("/");
module.exports = route;
