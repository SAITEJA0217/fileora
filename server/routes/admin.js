const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const adminController = require('../controllers/adminController');

// All routes here require both auth and admin rights
router.get('/users', auth, admin, adminController.getAllUsers);
router.put('/update-plan', auth, admin, adminController.updateUserPlan);
router.put('/toggle-admin', auth, admin, adminController.toggleAdmin);

module.exports = router;
