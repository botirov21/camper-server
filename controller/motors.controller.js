const asyncHandler = require("../middleware/async");
const Motors = require("../models/motors");


// Create data
exports.createNewMotor = asyncHandler(async (req, res, next) => {
    const newMotor = await Motors.create({
        name: req.body.name,
        company: req.body.company,
        cost: req.body.cost,
        licence: req.body.licence,
    });
    res.status(200).json({
        success: true,
        data: newMotor,
    });
});

// Get all data
exports.getAllMotors = asyncHandler(async (req, res, next) => {
    const motors = await Motors.find({})
    res.status(200).json({
        success: true,
        data: motors,
    });
});

// Get data by id
exports.getMotorByID = asyncHandler(async (req, res, next) => {
    const motorId = req.params.id;
    const data = await Motors.findById(motorId);

    res.status(200).json(data);
});

// Update data
exports.updateMotor = asyncHandler(async (req, res) => {
    const motorId = req.params.id;
    const updatedData = {
        name: req.body.name || null,
        company: req.body.company || null,
        cost: req.body.cost || null,
        licence: req.body.licence || null,
    };
    const updatedMotor = await Motors.findByIdAndUpdate(motorId, updatedData, {
        new: true,
    });

    res.status(200).json({
        success: true,
        data: updatedMotor,
    });
});

//Delete data
exports.deleteData = asyncHandler(async (req, res) => {
    const motorId = req.params.id;
    const deletedData = await Motors.findByIdAndDelete(motorId);
    res.status(200).json(`Data deleted succesfully ${deletedData}`);
})
