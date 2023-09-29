import express from "express";
import controller from "../controller/content.js";
import content from "../models/content.js";
var router = express.Router();

router.get('/catalogue/:id',controller.getCatalogueById)
router.get('/catalogue', controller.getCatalogue)
router.post('/catalogue', controller.postCatalogue)
router.put('/catalogue/:id',controller.updateCatalogue)
router.delete('/catalogue/:id',controller.deleteCatalogue)
router.get('/category', controller.getCategory);
export default router;