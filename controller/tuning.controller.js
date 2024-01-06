const asyncHandler = require("../middleware/async");
const Tuning = require("../models/tuning");


// Create data
exports.createNewTuning = asyncHandler(async (req, res, next) => {
    const newTuning = await Tuning.create({
        name: req.body.name,
        company: req.body.company,
        cost: req.body.cost,
        licence: req.body.licence,
    });
    res.status(200).json({
        success: true,
        data: newTuning,
    });
});

// Get all data
exports.getAllTunings = asyncHandler(async (req, res, next) => {
    const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 3;

    const limit = parseInt(req.query.limit || pageLimit);
    const page = parseInt(req.query.page || 1);
    const total = await Tuning.countDocuments();
  
    const tunings = await Tuning.find()
      .skip(page * limit - limit)
      .limit(limit);
    res.status(200).json({
        success: true,
        pageCount: Math.ceil(total / limit),
        currentPage: page,
        next: Math.ceil(total / limit) < page + 1 ? null : page + 1,
        data: tunings,    
    });
});

// Get data by id
exports.getTuningById = asyncHandler(async (req, res, next) => {
    const data = await Tuning.findById(req.params.id);
    res.status(200).json(data);
});

// Update data
exports.updateTuning= asyncHandler(async (req, res) => {
    const updatedData = {
        name: req.body.name,
        company: req.body.company,
        cost: req.body.cost,
        licence: req.body.licence,
    };
    const updatedTuning = await Tuning.findByIdAndUpdate(req.params.id, updatedData);
    res.status(200).json({
        success: true, 
        data: updatedTuning,
    });
});

//Delete data
exports.deleteTuning = asyncHandler(async (req, res) => {
    await Tuning.findByIdAndDelete(req.params.id);
    res.status(200).json("Data deleted succesfully");
})
