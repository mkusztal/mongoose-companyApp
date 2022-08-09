const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAllDepartment);

router.get('/departments/random', DepartmentController.getRandomDepartment);

router.get('/departments/:id', DepartmentController.getDepartmentById);

router.post('/departments', DepartmentController.addDepartment);

router.put('/departments/:id', DepartmentController.updateDepartmentById);

router.delete('/departments/:id', DepartmentController.removeDepartmentById);

module.exports = router;
