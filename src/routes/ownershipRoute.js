/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/
const express = require('express');
const router = express.Router();

const ownershipController = require("../controllers/ownershipController")

///////////////////////////////////////////////////////////////////////
//CA1
///////////////////////////////////////////////////////////////////////
router.get('/', ownershipController.readAllOwnership);
router.get('/:ownership_id', ownershipController.readOwnershipById);
router.post('/', ownershipController.checkUserExists, ownershipController.checkPetExists, ownershipController.createNewOwnership, ownershipController.showOwnershipDetails);
router.delete('/:ownership_id', ownershipController.deleteOwnershipById);
router.put('/:ownership_id', ownershipController.checkUserExistsForUpdate, ownershipController.checkPetExists, ownershipController.updateOwnership, ownershipController.showUpdatedOwnershipDetails);
router.get('/users/:user_id', ownershipController.getOwnershipsByUser_id);
router.get('/pets/:pet_id', ownershipController.getOwnershipsByPet_id);

///////////////////////////////////////////////////////////////////////
//CA2
///////////////////////////////////////////////////////////////////////
router.delete("/:ownership_id", ownershipController.deleteOwnershipById);

module.exports = router;
