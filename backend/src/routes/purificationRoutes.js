const express = require('express');
const router = express.Router();
const purificationController = require('../controllers/PurificationController');

router.post('/:gameId', purificationController.buildPurificationFacility);
router.get('/:gameId', purificationController.getPurificationFacilities);
router.get('/:gameId/:facilityId', purificationController.getPurificationFacility);
router.delete('/:gameId/:facilityId', purificationController.deletePurificationFacility);

module.exports = router;