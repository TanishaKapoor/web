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
    db_1.Subject.findAll()
        .then((subject) => {
        res.send(subject);
    })
        .catch((err) => {
        res.send('error');
    });
});
route.post("/", (req, res) => {
    db_1.Subject.create({
        name: req.body.name,
        courseId: req.body.id
    })
        .then((subjects) => {
        res.send(subjects);
    })
        .catch((err) => {
        res.send(err);
    });
});
route.get('/:id', (req, res) => {
    db_1.Subject.find({
        where: {
            id: {
                [sequelize_1.default.Op.eq]: req.params.id
            }
        }
    }).then((subject) => {
        res.send(subject);
    }).catch((err) => {
        res.send("Id invalid");
    });
});
route.delete('/:id', (req, res) => {
    db_1.Subject.destroy({
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
route.get("/:id/teachers", (req, res) => {
    db_1.Subject.find({
        where: {
            id: {
                [sequelize_1.default.Op.eq]: req.params.id
            }
        }
    }).then((course) => {
        db_2.Teacher.findAll({
            where: {
                subjectId: req.params.id
            }
        }).then((teachers) => {
            res.send(teachers);
        }).catch((err) => {
            res.send("No batches for this course");
        });
    }).catch((err) => {
        res.send("Invalid Id");
    });
});
module.exports = route;
