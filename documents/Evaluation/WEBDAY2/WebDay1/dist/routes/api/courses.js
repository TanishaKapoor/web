"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const db_1 = require("../../db");
const db_2 = require("../../db");
const db_3 = require("../../db");
const db_4 = require("../../db");
const db_5 = require("../../db");
const db_6 = require("../../db");
const sequelize_1 = __importDefault(require("sequelize"));
const express_1 = require("express");
const route = express_1.Router();
route.get('/', (req, res) => {
    db_1.Course.findAll()
        .then((courses) => {
        res.send(courses);
    })
        .catch((err) => {
        res.send(err);
    });
});
route.post("/", (req, res) => {
    db_1.Course.create({
        name: req.body.name
    })
        .then((course) => {
        res.send(course);
    })
        .catch((err) => {
        res.send("error sendind");
    });
});
route.get('/:id', (req, res) => {
    db_1.Course.find({
        where: {
            id: {
                [sequelize_1.default.Op.eq]: req.params.id
            }
        }
    }).then((course) => {
        res.send(course);
    }).catch((err) => {
        res.send("Id invalid");
    });
});
route.delete('/:id', (req, res) => {
    db_1.Course.destroy({
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
    db_1.Course.find({
        where: {
            id: {
                [sequelize_1.default.Op.eq]: req.params.id
            }
        }
    }).then((course) => {
        db_2.Batch.findAll({
            where: {
                courseId: req.params.id
            }
        }).then((batch) => {
            res.send(batch);
        });
    }).catch((err) => {
        res.send("Invalid Id");
    });
});
route.get("/:id/batches/:id1", (req, res) => {
    db_1.Course.find({
        where: {
            id: {
                [sequelize_1.default.Op.eq]: req.params.id
            }
        }
    }).then((course) => {
        db_2.Batch.findAll({
            where: {
                courseId: req.params.id,
                id: req.params.id1
            }
        }).then((batch) => {
            if (batch.length == 0)
                res.send("Invalid batch id for this course");
            else
                res.send(batch);
        });
    }).catch((err) => {
        res.send("Invalid Id");
    });
});
route.get("/:id/batches/:id1/lectures", (req, res) => {
    db_1.Course.find({
        where: {
            id: {
                [sequelize_1.default.Op.eq]: req.params.id
            }
        }
    }).then((course) => {
        db_2.Batch.findAll({
            where: {
                courseId: req.params.id,
                id: req.params.id1
            }
        }).then((batch) => {
            if (batch.length == 0) {
                res.send("Invalid batch id for this course");
            }
            else {
                db_3.Lecture.findAll({
                    where: {
                        batchId: req.params.id1
                    }
                }).then((lectures) => {
                    if (lectures.length == 0) {
                        res.send("no lectures for this batch");
                    }
                    else {
                        res.send(lectures);
                    }
                }).catch((err) => {
                    res.send("No lecture for this batch");
                });
            }
        }).catch((err) => {
            res.send("Invalid batch id for this course");
        });
    }).catch((err) => {
        res.send("Invalid Id");
    });
});
route.get("/:id/batches/:id1/lectures/:id2", (req, res) => {
    db_1.Course.find({
        where: {
            id: {
                [sequelize_1.default.Op.eq]: req.params.id
            }
        }
    }).then((course) => {
        db_2.Batch.findAll({
            where: {
                courseId: req.params.id,
                id: req.params.id1
            }
        }).then((batch) => {
            if (batch.length == 0) {
                res.send("Invalid batch id for this course");
            }
            else {
                db_3.Lecture.findAll({
                    where: {
                        batchId: req.params.id1,
                        id: req.params.id2
                    }
                }).then((lectures) => {
                    if (lectures.length == 0) {
                        res.send("no lectures for this batch");
                    }
                    else {
                        res.send(lectures);
                    }
                }).catch((err) => {
                    res.send("Invalid lecture Id");
                });
            }
        }).catch((err) => {
            res.send("Invalid batch id for this course");
        });
    }).catch((err) => {
        res.send("Invalid Id");
    });
});
route.get("/:id/batches/:id1/teachers", (req, res) => {
    db_3.Lecture.findAll({
        where: {
            batchId: req.params.id1
        },
        include: [{
                model: db_4.Teacher,
                as: 'teacher'
            }]
    }).then((l) => {
        var tech = [];
        l.forEach(element => {
            tech.push(element.teacher);
        });
        res.send(tech);
    }).catch((err) => {
        res.send("Error");
    });
});
route.get("/:id/batches/:id1/students", (req, res) => {
    let students = [];
    db_6.StudentBatch.findAll({
        where: {
            batchId: req.params.id1
        }
    }).then((batches) => {
        batches.forEach(element => {
            students.push(element.studentId);
        });
        db_5.Student.findAll({
            where: {
                id: students
            }
        })
            .then((batches) => {
            res.json(batches);
        });
    }).catch((err) => {
        res.send("no related students");
    });
});
module.exports = route;
