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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database/database"));
const _ = __importStar(require("lodash"));
// getCatalogo
exports.getCatalogo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.default.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Order by articulo; ;');
        const dataResp = response.rows;
        return res.status(200).json({
            message: 'Query succesfully',
            data: dataResp
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in query',
            error: e
        });
    }
});
// getCatalogoDesc
exports.getCatalogoDesc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.default.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Order by id desc;');
        const dataResp = response.rows;
        return res.status(200).json({
            message: 'Query succesfully',
            data: dataResp
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in query',
            error: e
        });
    }
});
// getCatalogo
exports.getCatalogoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield database_1.default.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Where id = $1;', [id]);
        const dataResp = response.rows;
        return res.status(200).json({
            message: 'Query succesfully',
            data: dataResp
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in query',
            error: e
        });
    }
});
// getCatalogo
exports.getCatalogoArt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { grupo, claveart, articulo } = req.query;
        //console.log('grupo, claveart, articulo: ', grupo, claveart, articulo)
        if (_.isNil(grupo) || grupo == 'null') {
            grupo = '';
        }
        ;
        if (_.isNil(claveart) || claveart == 'null') {
            claveart = '';
        }
        ;
        if (_.isNil(articulo) || articulo == 'null') {
            articulo = '';
        }
        ;
        let paramData = {
            g1: `%${_.toUpper(grupo)}%`,
            g2: `%${_.upperFirst(grupo)}%`,
            g3: `%${_.toLower(grupo)}%`,
            c1: `%${_.toUpper(claveart)}%`,
            c2: `%${_.upperFirst(claveart)}%`,
            c3: `%${_.toLower(claveart)}%`,
            a1: `%${_.toUpper(articulo)}%`,
            a2: `%${_.upperFirst(articulo)}%`,
            a3: `%${_.toLower(articulo)}%`
        };
        console.log('paramData: ', paramData);
        //console.log('grupo, claveart, articulo: ', grupo, claveart, articulo)
        let response;
        if (grupo.length > 0) {
            response = yield database_1.default.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Where (grupo LIKE $1 OR grupo LIKE $2 OR grupo LIKE $3) Order by articulo;', [paramData.g1, paramData.g2, paramData.g3]);
        }
        else if (claveart.length > 0) {
            response = yield database_1.default.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Where (claveart LIKE $1 OR claveart LIKE $2 OR claveart LIKE $3) Order by articulo;', [paramData.c1, paramData.c2, paramData.c3]);
        }
        else if (articulo.length > 0) {
            response = yield database_1.default.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Where (articulo LIKE $1 OR articulo LIKE $2 OR articulo LIKE $3) Order by articulo;', [paramData.a1, paramData.a2, paramData.a3]);
        }
        else {
            response = yield database_1.default.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Order by articulo;');
        }
        console.log('response: ', response.rows);
        const dataResp = response.rows;
        return res.status(200).json({
            message: 'Query succesfully',
            data: dataResp
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in query',
            error: e
        });
    }
});
exports.addArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newArticulo = {
            grupo: req.body.grupo,
            claveart: req.body.claveart,
            articulo: req.body.articulo,
            urlimagen: req.body.urlimagen,
            impuesto: req.body.impuesto,
            precio: req.body.precio
        };
        console.log('newArticulo: ', newArticulo);
        // newArticulo Validation
        const articuloExists = yield database_1.default.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Where grupo = $1 and claveart = $2;', [newArticulo.grupo, newArticulo.claveart]);
        if (articuloExists.rowCount > 0)
            return res.status(400).json('Vehicle already exists');
        // insert articulo
        const savedArticulo = yield database_1.default.query('INSERT INTO spproject.catalogo (grupo, claveart, articulo, urlimagen, impuesto, precio) VALUES ($1, $2, $3, $4, $5, $6);', [newArticulo.grupo, newArticulo.claveart, newArticulo.articulo, newArticulo.urlimagen, newArticulo.impuesto, newArticulo.precio]);
        newArticulo.success = true;
        console.log('savedArticulo: ', savedArticulo);
        return res.status(200).json({
            message: 'Articulo add succesfully',
            data: newArticulo
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in create articulo',
            error: e
        });
    }
});
exports.updateArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Articulo = {
            id: req.params.id,
            grupo: req.body.grupo,
            claveart: req.body.claveart,
            articulo: req.body.articulo,
            urlimagen: req.body.urlimagen,
            impuesto: req.body.impuesto,
            precio: req.body.precio
        };
        console.log('Articulo: ', Articulo);
        // update Articulo
        const response = yield database_1.default.query('UPDATE spproject.catalogo SET grupo = $2, claveart = $3, articulo = $4, urlimagen = $5, impuesto = $6, precio = $7 WHERE id = $1', [Articulo.id, Articulo.grupo, Articulo.claveart, Articulo.articulo, Articulo.urlimagen, Articulo.impuesto, Articulo.precio]);
        return res.status(200).json({
            message: 'Articulo updated succesfully',
            data: response
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in update Articulo',
            error: e
        });
    }
});
exports.regCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let regCompra;
        let bodyInt = req.body;
        //console.log('bodyInt: ', bodyInt);
        let newCompra = { detalle: bodyInt.detalle, success: false };
        yield Promise.all(Object.keys(bodyInt.detalle).map((k, i) => __awaiter(void 0, void 0, void 0, function* () {
            let { userid, artid, folio, fecha, impuesto, cantidad, precio } = bodyInt.detalle[k];
            console.log('userid, artid, folio, fecha, impuesto, cantidad, precio: ', userid, artid, folio, fecha, impuesto, cantidad, precio);
            // insert compra
            regCompra = yield database_1.default.query(' INSERT INTO spproject.salesbook(userid, artid, folio, fecha, impuesto, cantidad, precio) VALUES ($1, $2, $3, $4, $5, $6, $7);', [userid, artid, folio, fecha, impuesto, cantidad, precio]);
            //console.log('regCompra: ', regCompra);
        })));
        newCompra.success = true;
        return res.status(200).json({
            message: 'Compra add succesfully',
            data: newCompra
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in create compra',
            error: e
        });
    }
});
