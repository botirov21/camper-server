const { Router } = require("express");
const { createNewMotor, getAllMotors, getMotorByID, updateMotor, deleteData } = require("../controller/motors.controller");

const router = Router();

router.post("/addNewMotor", createNewMotor);
router.get("/allMotors", getAllMotors);
router.get("/:id", getMotorByID);
router.put("/:id", updateMotor);
router.delete("/:id", deleteData);
module.exports = router;