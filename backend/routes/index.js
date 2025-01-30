const express = require("express");
const {
  getAllController,
  postController,
  updateController,
  deleteOrderController,
  sortByController,
  searchController,
  getmovieController,
} = require("../controller/moviesController.js");
const {
  userRegisterController,
  userLoginController,
  userDetailsController,
  userLogout,
} = require("../controller/userController.js");
const authToken = require("../middleware/authToken.js");
const router = express.Router();

//User
router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogout);

router.get("/movies", getAllController);
router.get("/movies/:id", getmovieController);
router.post("/movies", authToken, postController);
router.put("/movies/:id",authToken, updateController);
router.delete("/movies/:id",authToken, deleteOrderController);
router.get("/search",searchController);
router.get("/sort",sortByController)
module.exports = router;
