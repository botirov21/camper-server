const { Router } = require("express");
const { createNewMotor, getAllMotors, updateMotor, deleteMotor, getMotorById } = require("../controller/motors.controller");

const router = Router();

router.post("/addNewMotor", createNewMotor);
router.get("/allMotors", getAllMotors);
router.get("/:id", getMotorById);
router.put("/:id", updateMotor);
router.delete("/:id", deleteMotor);
module.exports = router;