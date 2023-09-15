const express = require('express');
const userRouter = express.Router();
const authUser = require('../middlewares/authUser');

const createUser = require('../controllers/users/createUser');
/* const activateUser = require('../controllers/users/activateUser'); */
const loginUser = require('../controllers/users/loginUser');
const getUser = require('../controllers/users/getUser');
const editUser = require('../controllers/users/editUser');
const addUserReview = require('../controllers/users/addUserReview');

userRouter.post('/create', createUser);
/* userRouter.get('/activate/:registrationCode', activateUser); */
userRouter.post('/login', loginUser);
// userRouter.post('/user/reviews/:userId', authUser, addUserReview);
userRouter.get('/profile/:userId', getUser);
userRouter.put('/edit', authUser, editUser);

module.exports = userRouter;
