const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const productRouter = require("./productRouter");

router.use("/products", productRouter.router);
=======
const userRouter = require('./userRouter');

router.use('/users', userRouter);

>>>>>>> main

module.exports = router;
