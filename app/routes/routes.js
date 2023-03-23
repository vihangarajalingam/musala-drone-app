import express from "express";
import droneController from '../controllers/droneController.js';

var router = express.Router();

router.post('/drone/create', droneController.create);
router.post('/drone/load', droneController.load);

export default router;