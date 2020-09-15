"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
require("./database/database");
function init() {
    app_1.default.listen(process.env.PORT || 5000, function () {
        console.log('Server listening on port 5000');
    });
}
;
init();
