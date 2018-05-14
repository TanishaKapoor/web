"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const route = express_1.Router();
const courses_1 = __importDefault(require("./courses"));
const batches_1 = __importDefault(require("./batches"));
const teachers_1 = __importDefault(require("./teachers"));
const students_1 = __importDefault(require("./students"));
const lectures_1 = __importDefault(require("./lectures"));
const subjects_1 = __importDefault(require("./subjects"));
route.use("/courses", courses_1.default);
route.use("/batches", batches_1.default);
route.use("/teachers", teachers_1.default);
route.use("/students", students_1.default);
route.use("/lectures", lectures_1.default);
route.use("/subjects", subjects_1.default);
module.exports = route;
