"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db = new sequelize_1.default("schooldb", "schooluser", "schoolpass", {
    dialect: 'sqlite',
    storage: './schooldb'
});
const Course = db.define('courses', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Course = Course;
const Batch = db.define('batches', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Batch = Batch;
const Teacher = db.define("teachers", {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Teacher = Teacher;
const Student = db.define("students", {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Student = Student;
const Lecture = db.define("lectures", {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Lecture = Lecture;
const Subject = db.define("subjects", {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Subject = Subject;
const StudentBatch = db.define("studentbatch", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});
exports.StudentBatch = StudentBatch;
Teacher.belongsTo(Subject);
Batch.belongsTo(Course);
Lecture.belongsTo(Batch);
Lecture.belongsTo(Teacher);
Subject.belongsTo(Course);
Student.belongsToMany(Batch, { through: StudentBatch });
Batch.belongsToMany(Student, { through: StudentBatch });
db.sync()
    .then(() => console.log("database has been synced"))
    .catch((err) => console.log("Error creating database"));
