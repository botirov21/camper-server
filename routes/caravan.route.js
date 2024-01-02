const {Router} = require("express");
const { createNewCaravan, getAllCaravans, getCaravanById, updateCaravan, deleteCaravan } = require("../controller/caravan.controller");

const router = Router();

router.post("/addNewCaravan", createNewCaravan);
router.get("/allCaravans", getAllCaravans);
router.get("/:id", getCaravanById);
router.put("/:id", updateCaravan);
router.delete("/:id", deleteCaravan);
module.exports = router;