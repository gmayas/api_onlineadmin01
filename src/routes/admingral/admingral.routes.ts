import { Router } from 'express';
const router = Router();

import { getCatalogo, getCatalogoDesc, getCatalogoId, getCatalogoArt, addArticulo, updateArticulo, regCompra} from '../../controllers/admingral/catalogo.controller'
import { TokenValidation } from '../../libs/Validations'

router.get('/getCatalogo', TokenValidation, getCatalogo );
router.get('/getCatalogoDesc', TokenValidation, getCatalogoDesc );
router.get('/getCatalogoArt', TokenValidation, getCatalogoArt );
router.get('/getCatalogo/:id', TokenValidation, getCatalogoId );
router.post('/addArticulo', TokenValidation, addArticulo);
router.post('/updateArticulo/:id', TokenValidation, updateArticulo);
router.post('/regCompra', TokenValidation, regCompra);

export default router;