const asyncHandler = require("../middleware/async");
const Caravan = require("../models/caravan");


// Create data
exports.createNewCaravan = asyncHandler(async (req, res, next) => {
    const newCaravan = await Caravan.create({
        name: req.body.name,
        brand: req.body.brand,
        cost: req.body.cost,
        licence: req.body.licence,
        seats: req.body.seats,
        location: req.body.location,
    });
    res.status(200).json({
        success: true,
        data: newCaravan,
    });
});

// Get all data
exports.getAllCaravans = asyncHandler(async (req, res, next) => {
    const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 3;

    const limit = parseInt(req.query.limit || pageLimit);
    const page = parseInt(req.query.page || 1);
    const total = await Caravan.countDocuments();
  
    const caravans = await Caravan.find()
      .skip(page * limit - limit)
      .limit(limit);
    res.status(200).json({
        success: true,
        pageCount: Math.ceil(total / limit),
        currentPage: page,
        next: Math.ceil(total / limit) < page + 1 ? null : page + 1,
        data: caravans,    
    });
});

// Get data by id
exports.getCaravanById = asyncHandler(async (req, res, next) => {
    const data = await Caravan.findById(req.params.id);
    res.status(200).json(data);
});

// Update data
exports.updateCaravan = asyncHandler(async (req, res) => {
    const updatedData = {
        name: req.body.name,
        brand: req.body.brand,
        cost: req.body.cost,
        licence: req.body.licence,
        seats: req.body.seats,
        location: req.body.location,
    };
    const updatedCaravan = await Caravan.findByIdAndUpdate(req.params.id, updatedData);
    res.status(200).json({
        success: true, 
        data: updatedCaravan,
    });
});

//Delete data
exports.deleteCaravan = asyncHandler(async (req, res) => {
    await Caravan.findByIdAndDelete(req.params.id);
    res.status(200).json("Data deleted succesfully");
})
