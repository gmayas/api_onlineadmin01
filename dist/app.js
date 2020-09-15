"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors = require('cors');
const authuser_routes_1 = __importDefault(require("./routes/authuser/authuser.routes"));
const admingral_routes_1 = __importDefault(require("./routes/admingral/admingral.routes"));
const app = express_1.default();
// settings
app.set('port', 5000 || process.env.PORT);
// Middlewares
app.use(morgan_1.default('dev'));
/*app.use(express.urlencoded({ extended: true }))
app.use(express.json());*/
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors());
// Routes
app.use('/api/authuser', authuser_routes_1.default);
app.use('/api/admingral', admingral_routes_1.default);
//
exports.default = app;
