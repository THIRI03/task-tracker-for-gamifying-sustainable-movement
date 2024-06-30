/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/
const express = require('express');
const router = express.Router();

const petController = require("../controllers/petController");

///////////////////////////////////////////////////////////////////////
//CA1
///////////////////////////////////////////////////////////////////////
router.put('/:pet_id', petController.checkPetName, petController.updatePetById, petController.showUpdatedPetDetails);
router.post('/', petController.checkPetName, petController.createNewPet, petController.showPetDetails);
router.delete('/:pet_id', petController.deletePetByid);

///////////////////////////////////////////////////////////////////////
//CA2
///////////////////////////////////////////////////////////////////////
router.get("/", petController.readAllPets);
router.get("/:pet_id", petController.readPetById);


module.exports = router;
