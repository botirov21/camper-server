const asyncHandler = require("../middleware/async");
const UsedCar = require("../models/usedCar");


// Create data
exports.createNewUsedCar = asyncHandler(async (req, res, next) => {
    const newUsedCar = await UsedCar.create({
        name: req.body.name,
        brand: req.body.brand,
        company: req.body.company,
        cost: req.body.cost,
        licence: req.body.licence,
        seats: req.body.seats,
        location: req.body.location,
    });
    res.status(200).json({
        success: true,
        data: newUsedCar,
    });
});

// Get all data
exports.getAllUsedCars = asyncHandler(async (req, res, next) => {
    const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 3;

    const limit = parseInt(req.query.limit || pageLimit);
    const page = parseInt(req.query.page || 1);
    const total = await UsedCar.countDocuments();
  
    const usedCars = await UsedCar.find()
      .skip(page * limit - limit)
      .limit(limit);
    res.status(200).json({
        success: true,
        pageCount: Math.ceil(total / limit),
        currentPage: page,
        next: Math.ceil(total / limit) < page + 1 ? null : page + 1,
        data: usedCars,    
    });
});

// Get data by id
exports.getUsedCarById = asyncHandler(async (req, res, next) => {
    const data = await UsedCar.findById(req.params.id);
    res.status(200).json(data);
});

// Update data
exports.updateUsedCar = asyncHandler(async (req, res) => {
    const updatedData = {
        name: req.body.name,
        brand: req.body.brand,
        company: req.body.company,
        cost: req.body.cost,
        licence: req.body.licence,
        seats: req.body.seats,
        location: req.body.location,
    };
    const updatedUsedCar = await UsedCar.findByIdAndUpdate(req.params.id, updatedData);
    res.status(200).json({
        success: true, 
        data: updatedUsedCar,
    });
});

//Delete data
exports.deleteUsedCar = asyncHandler(async (req, res) => {
    await UsedCar.findByIdAndDelete(req.params.id);
    res.status(200).json("Data deleted succesfully");
})
