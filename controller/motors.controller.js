const asyncHandler = require("../middleware/async");
const Motors = require("../models/motors");


// Create data
exports.createNewMotor = asyncHandler(async (req, res, next) => {
    const newMotor = await Motors.create({
        name: req.body.name,
        brand: req.body.brand,
        cost: req.body.cost,
        licence: req.body.licence,
        seats: req.body.seats,
        location: req.body.location,
        image: req.body.image,
    });
    res.status(200).json({
        success: true,
        data: newMotor,
    });
});

// Get all data
exports.getAllMotors = asyncHandler(async (req, res, next) => {
    const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 10;

    const limit = parseInt(req.query.limit || pageLimit);
    const page = parseInt(req.query.page || 1);
    const total = await Motors.countDocuments();
  
    const motors = await Motors.find()
      .skip(page * limit - limit)
      .limit(limit);
    res.status(200).json({
        success: true,
        pageCount: Math.ceil(total / limit),
        currentPage: page,
        next: Math.ceil(total / limit) < page + 1 ? null : page + 1,
        data: motors,    
    });
});

// Get data by id
exports.getMotorById = asyncHandler(async (req, res, next) => {
    const motorId = req.params.id;
    const data = await Motors.findById(motorId);

    res.status(200).json(data);
});

// Update data
exports.updateMotor = asyncHandler(async (req, res) => {
    const updatedData = {
        name: req.body.name,
        brand: req.body.brand,
        cost: req.body.cost,
        licence: req.body.licence,
        seats: req.body.seats,
        location: req.body.location,
        image: req.body.image,
    };
    const updatedMotor = await Motors.findByIdAndUpdate(req.params.id, updatedData);
    res.status(200).json({
        success: true, 
        data: updatedMotor,
    });
});

//Delete data
exports.deleteMotor = asyncHandler(async (req, res) => {
    await Motors.findByIdAndDelete(req.params.id);
    res.status(200).json("Data deleted succesfully");
})
