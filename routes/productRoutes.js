const express = require('express');
const router = express.Router();

const createTaskController=require('../controllers/productController')
const getTaskController=require('../controllers/productController')
const updateTaskController=require('../controllers/productController')
const deleteTaskController=require('../controllers/productController')


router.post('/inserttask', createTaskController.createProduct)
router.get('/getAlltask', getTaskController.getAllProducts)
router.put('/updatetask/:id', updateTaskController.updateProduct )
router.delete('/deletetask/:id' , deleteTaskController.deleteProduct)
router.get('/getTaskByFilters', getTaskController.getProductById)

module.exports = router

