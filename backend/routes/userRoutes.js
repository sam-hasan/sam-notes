const express = require('express');
const {
  signup,
  login,
  protect,
  logout,
  updateUserProfile,
} = require('../controllers/authController');
const { getUserProfile } = require('../controllers/userController');

const router = express.Router();

router.route('/').post(signup);
router.post('/login', login);
router.get('/logout', logout);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
