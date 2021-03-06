"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.TokenValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('token');
        console.log('token xxx: ', token);
        if (!token)
            return res.status(401).json('Access Denied');
        const payload = yield jsonwebtoken_1.default.verify(token, process.env['TOKEN_SECRET'] || '');
        console.log('payload: ', payload);
        req.emailUser = payload.emailuser; // Se guarda en  req.userId paa que todas las rutas la puedan ver. 
        next();
    }
    catch (e) {
        console.log('error : ', e);
        return res.status(400).json({
            message: 'Invalid Token',
            error: e
        });
    }
});
exports.encrypPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        return bcryptjs_1.default.hash(password, salt);
    }
    catch (e) {
        console.log('Encryption error (encrypPassword)', e);
        return 'Encryption error (encrypPassword).';
    }
});
exports.validatePassword = function (password, QueryPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield bcryptjs_1.default.compare(password, QueryPassword);
        }
        catch (e) {
            console.log('Error validatePassword: false', e);
            return false;
        }
    });
};
