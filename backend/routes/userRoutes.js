const express = require('express');
const {
  signup,
  login,
  protect,
  logout,
  updateUserProfile,
  restrictTo,
} = require('../controllers/authController');
const {
  getUserProfile,
  deleteUser,
  getUserById,
  updateUser,
  deleteMe,
  getAllUsers,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').post(signup).get(protect, restrictTo('admin'), getAllUsers);
router.post('/login', login);
router.get('/logout', logout);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// router.delete('/deleteMe', deleteMe);

router
  .route('/:id')
  .delete(protect, restrictTo('admin'), deleteUser)
  .get(protect, restrictTo('admin'), getUserById)
  .put(protect, restrictTo('admin'), updateUser);

module.exports = router;
