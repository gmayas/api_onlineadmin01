import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import pool from '../../database/database';
import * as _ from 'lodash';

// getCatalogo
export const getCatalogo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Order by articulo; ;');
        const dataResp = response.rows;
        return res.status(200).json({
            message: 'Query succesfully',
            data: dataResp
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in query',
            error: e
        })
    }
};

// getCatalogoDesc
export const getCatalogoDesc = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Order by id desc;');
        const dataResp = response.rows;
        return res.status(200).json({
            message: 'Query succesfully',
            data: dataResp
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in query',
            error: e
        })
    }
};

// getCatalogo
export const getCatalogoId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const response: QueryResult = await pool.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Where id = $1;', [id]);
        const dataResp = response.rows;
        return res.status(200).json({
            message: 'Query succesfully',
            data: dataResp
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in query',
            error: e
        })
    }
};

// getCatalogo
export const getCatalogoArt = async (req: Request, res: Response): Promise<Response> => {
    try {
        let { grupo, claveart, articulo }: any = req.query;
        //console.log('grupo, claveart, articulo: ', grupo, claveart, articulo)
        if (_.isNil(grupo) || grupo == 'null') { grupo = '' };
        if (_.isNil(claveart) || claveart == 'null') { claveart = '' };
        if (_.isNil(articulo) || articulo == 'null') { articulo = '' };
        let paramData: any = {
            g1: `%${_.toUpper(grupo)}%`,
            g2: `%${_.upperFirst(grupo)}%`,
            g3: `%${_.toLower(grupo)}%`,
            c1: `%${_.toUpper(claveart)}%`,
            c2: `%${_.upperFirst(claveart)}%`,
            c3: `%${_.toLower(claveart)}%`,
            a1: `%${_.toUpper(articulo)}%`,
            a2: `%${_.upperFirst(articulo)}%`,
            a3: `%${_.toLower(articulo)}%`
        }
        console.log('paramData: ', paramData);
        //console.log('grupo, claveart, articulo: ', grupo, claveart, articulo)
        let response: QueryResult;
        if (grupo.length > 0) {
            response = await pool.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Where (grupo LIKE $1 OR grupo LIKE $2 OR grupo LIKE $3) Order by articulo;', [paramData.g1, paramData.g2, paramData.g3]);
        } else if (claveart.length > 0) {
            response = await pool.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Where (claveart LIKE $1 OR claveart LIKE $2 OR claveart LIKE $3) Order by articulo;', [paramData.c1, paramData.c2, paramData.c3]);
        } else if (articulo.length > 0) {
            response = await pool.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Where (articulo LIKE $1 OR articulo LIKE $2 OR articulo LIKE $3) Order by articulo;', [paramData.a1, paramData.a2, paramData.a3]);
        } else {
            response = await pool.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Order by articulo;');
        }
        console.log('response: ', response.rows)
        const dataResp: any = response.rows;
        return res.status(200).json({
            message: 'Query succesfully',
            data: dataResp
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in query',
            error: e
        })
    }
};

export const addArticulo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newArticulo: any = {
            grupo: req.body.grupo,
            claveart: req.body.claveart,
            articulo: req.body.articulo,
            urlimagen: req.body.urlimagen,
            impuesto: req.body.impuesto,
            precio: req.body.precio
        };
        console.log('newArticulo: ', newArticulo);
        // newArticulo Validation
        const articuloExists: QueryResult = await pool.query('Select id, grupo, claveart, articulo, urlimagen, impuesto, precio from spproject.catalogo Where grupo = $1 and claveart = $2;', [newArticulo.grupo, newArticulo.claveart]);
        if (articuloExists.rowCount > 0) return res.status(400).json('Vehicle already exists');
        // insert articulo
        const savedArticulo: QueryResult = await pool.query('INSERT INTO spproject.catalogo (grupo, claveart, articulo, urlimagen, impuesto, precio) VALUES ($1, $2, $3, $4, $5, $6);', [newArticulo.grupo, newArticulo.claveart, newArticulo.articulo, newArticulo.urlimagen, newArticulo.impuesto, newArticulo.precio]);
        newArticulo.success = true;
        console.log('savedArticulo: ', savedArticulo);
        return res.status(200).json({
            message: 'Articulo add succesfully',
            data: newArticulo
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in create articulo',
            error: e
        })
    }
};

export const updateArticulo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const Articulo: any = {
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
        const response = await pool.query('UPDATE spproject.catalogo SET grupo = $2, claveart = $3, articulo = $4, urlimagen = $5, impuesto = $6, precio = $7 WHERE id = $1', [Articulo.id, Articulo.grupo, Articulo.claveart, Articulo.articulo, Articulo.urlimagen, Articulo.impuesto, Articulo.precio]);
        return res.status(200).json({
            message: 'Articulo updated succesfully',
            data: response
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in update Articulo',
            error: e
        })
    }
};

export const regCompra = async (req: Request, res: Response): Promise<Response> => {
    try {
        let regCompra: QueryResult;
        let bodyInt: any = req.body;
        //console.log('bodyInt: ', bodyInt);
        let newCompra: any = { detalle: bodyInt.detalle, success: false };
        await Promise.all(Object.keys(bodyInt.detalle).map(async (k, i) => {
            let { userid, artid, folio, fecha, impuesto, cantidad, precio } = bodyInt.detalle[k];
            console.log('userid, artid, folio, fecha, impuesto, cantidad, precio: ', userid, artid, folio, fecha, impuesto, cantidad, precio);
            // insert compra
            regCompra = await pool.query(' INSERT INTO spproject.salesbook(userid, artid, folio, fecha, impuesto, cantidad, precio) VALUES ($1, $2, $3, $4, $5, $6, $7);', [userid, artid, folio, fecha, impuesto, cantidad, precio]);
            //console.log('regCompra: ', regCompra);
        }));
        newCompra.success = true;
        return res.status(200).json({
            message: 'Compra add succesfully',
            data: newCompra
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in create compra',
            error: e
        })
    }
};



