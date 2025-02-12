const express = require('express');
const router = express.Router();

const createTaskController=require('../controllers/orderController')
const getTaskController=require('../controllers/orderController')
const updateTaskController=require('../controllers/orderController')
//const deleteTaskController=require('../controllers/orderController')


router.post('/placeOrder', createTaskController.placeOrder)
router.get('/getAllOrders', getTaskController.getAllOrders)
router.get('/gettask1/:getOrderById', getTaskController.getOrderById)
router.get('/updatetask1/:id', updateTaskController.updateOrder)


module.exports = router