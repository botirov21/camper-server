const { Router } = require("express");
const { createNewTuning, getAllTunings, getTuningById, updateTuning, deleteTuning } = require("../controller/tuning.controller");

const router = Router();

router.post("/addNewTuning", createNewTuning);
router.get("/allTunings", getAllTunings);
router.get("/:id", getTuningById);
router.put("/:id", updateTuning);
router.delete("/:id", deleteTuning);
module.exports = router;