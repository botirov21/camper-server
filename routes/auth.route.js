const { Router } = require("express");
const { register, login, getAllUsers } = require("../controller/user.controller");
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getAllusers", getAllUsers);


module.exports = router;