const express = require("express");
const { createUser, getAllUser, login } = require("../controllers/auth");
const router = express.Router();

router.route("/create-user").post(createUser);
router.route("/all-user").get(getAllUser);
router.route("/login").post(login);

module.exports = router;
