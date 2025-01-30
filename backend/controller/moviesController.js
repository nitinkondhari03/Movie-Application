const movieModel = require("../models/moviesModel");
const userModel = require("../models/userModel");
//GET All Movies

async function getAllController(req, res) {
  try {
    const { page, sortBy, order,search } = req.query;
    const pages=parseInt(page)||1;
    const limit = parseInt(10);
   
 // Search filter
 const searchFilter = search
 ? {
     $or: [
       { name: { $regex: search, $options: 'i' } },
       { description: { $regex: search, $options: 'i' } },
     ],
   }
 : {};

      // Sorting options

    const validFields = ["name", "rating", "release_date", "duration",
      "description"
    ];
    if (sortBy && !validFields.includes(sortBy)) {
      return res.status(400).json({
        error: `Invalid sort field. Valid fields are: ${validFields.join(
          ", "
        )}`,
      });
    }
    const sortOrder = order === "desc" ? -1 : 1;
    const sortCriteria = sortBy ? { [sortBy]: sortOrder } : {};
    const movies = await movieModel.find(searchFilter).sort(sortCriteria).skip((page - 1) * limit)
    .limit(limit);
    const totalItems = await movieModel.countDocuments(searchFilter);
    res.json({
      data: movies,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: pages,
      message: "Search movie list",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

//GET All Movies

async function getmovieController(req, res) {
  try {
    const moviesid = await movieModel.findById(req.params.id);

    res.status(200).json({
      data: moviesid,
      success: true,
      message: "GET Movie successfully Fetch Data",
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

//Search Movies
const searchController = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i", "g");
    const product = await movieModel.find({
      $or: [
        {
          name: regex,
        },
        {
          description: regex,
        },
      ],
    });

    res.json({
      data: product,
      message: "Search movie list",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

//Sort By Movies
const sortByController = async (req, res) => {
  try {
    const { page, sortBy, order,search } = req.query;
    
  
    const pages=parseInt(page)||1;
    const limit = parseInt(4);
   
 // Search filter
 const searchFilter = search
 ? {
     $or: [
       { name: { $regex: search, $options: 'i' } },
       { description: { $regex: search, $options: 'i' } },
     ],
   }
 : {};

      // Sorting options

    const validFields = ["name", "rating", "release_date", "duration",
      "description"
    ];
    if (sortBy && !validFields.includes(sortBy)) {
      return res.status(400).json({
        error: `Invalid sort field. Valid fields are: ${validFields.join(
          ", "
        )}`,
      });
    }
    const sortOrder = order === "desc" ? -1 : 1;
    const sortCriteria = sortBy ? { [sortBy]: sortOrder } : {};
    const movies = await movieModel.find(searchFilter).sort(sortCriteria).skip((page - 1) * limit)
    .limit(limit);
    const totalItems = await movieModel.countDocuments(searchFilter);
    res.json({
      data: movies,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: pages,
      message: "Search movie list",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

//POST Movies
async function postController(req, res) {
  try {
    const sessionUserId = req.userId;
    const user = await userModel.findById(sessionUserId);
    console.log(user)
    if (user.role == "user") {
      throw new Error("Permission denied");
    }
    const postmovie = new movieModel(req.body);
    const savemovie = await postmovie.save();

    res.status(201).json({
      message: "Movie Data upload successfully",
      error: false,
      success: true,
      data: savemovie,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

// Update Movies
async function updateController(req, res) {
  const newmovieData = {
    name: req.body.name,
    rating: req.body.rating,
    release_date: req.body.release_date,
    duration: req.body.duration,
    description: req.body.description,
    imageurl: req.body.imageurl,
  };
  try {
    const sessionUserId = req.userId;
    const user = await userModel.findById(sessionUserId);
    console.log(user)
    if (user.role == "user") {
      throw new Error("Permission denied");
    }
    const movieupdate = await movieModel.findByIdAndUpdate(
      req.params.id,
      newmovieData,
      {
        new: true,
        runValidators: true,
        useFindModify: false,
      }
    );
    res.status(201).json({
      message: "movies update successfully",
      error: false,
      success: true,
      data: movieupdate,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

// Delete Movies
async function deleteOrderController(req, res) {
  try {
    const sessionUserId = req.userId;
    const user = await userModel.findById(sessionUserId);
    console.log(user)
    if (user.role == "user") {
      throw new Error("Permission denied");
    }
    let moviesid = await movieModel.findById(req.params.id);

    let moviesdelete = await movieModel.findByIdAndDelete(moviesid._id);
    res.status(201).json({
      message: "Movie Data Delete successfully",
      error: false,
      success: true,
      data: moviesdelete,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = {
  getAllController,
  getmovieController,
  postController,
  updateController,
  deleteOrderController,
  searchController,
  sortByController,
};
