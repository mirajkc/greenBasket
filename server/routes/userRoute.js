// routes/userRoute.js

import express from 'express';
import { isAuth, login, logout, register } from '../controllers/UserController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

// When the path is '/register', route the request to the 'register' controller function
userRouter.post('/register', register);
// When the path is '/login', route the request to the 'login' controller function
userRouter.post('/login', login);
//Authnticate User By 
userRouter.get('/is-auth',authUser, isAuth); //here auth user is a middleware that is to be
//executed before the controller fn called (isAuth)
//logoout user
userRouter.get('/logout',authUser, logout);

export default userRouter;
