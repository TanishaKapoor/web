"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const api_1 = __importDefault(require("./routes/api"));
const rotespecify = api_1.default;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use('/api', rotespecify);
app.listen(8080, () => {
    console.log("server started at http://localhost:8080");
});
