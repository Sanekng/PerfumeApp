const express = require('express');
const router = express.Router();
const perfumeController = require('../controllers/perfume.controller');

// CRUD Operations
router.post('/', perfumeController.createPerfume);
router.get('/', perfumeController.getAllPerfumes);
router.get('/:id', perfumeController.getPerfumeById);
router.put('/:id', perfumeController.updatePerfume);
router.delete('/:id', perfumeController.deletePerfume);

module.exports = router;
