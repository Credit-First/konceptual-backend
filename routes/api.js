var express = require('express');
var router = express.Router();

var { loginUser, session, registerUser } = require("../controllers/auth");
var { loginAdmin, registerAdmin } = require("../controllers/admin/auth");

router.post('/admin/auth/login', loginAdmin);
router.post('/admin/auth/register', registerAdmin);
router.post('/auth/login', loginUser);
router.post('/auth/token', session);
router.post('/auth/register', registerUser);

module.exports = router;
