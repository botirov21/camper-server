const { Router } = require("express");
const { createNewUsedCar, getUsedCarById, updateUsedCar, deleteUsedCar, getAllUsedCars } = require("../controller/usedCar.controller");

const router = Router();

router.post("/addNewUsedCar", createNewUsedCar);
router.get("/allUsedCars", getAllUsedCars);
router.get("/:id", getUsedCarById);
router.put("/:id", updateUsedCar);
router.delete("/:id", deleteUsedCar);
module.exports = router;