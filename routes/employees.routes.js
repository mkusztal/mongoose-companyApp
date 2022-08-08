const express = require('express');
const router = express.Router();
const EmployeesController = require('../controllers/employees.controller');

router.get('/employees', EmployeesController.getAllEmployees);

router.get('/employees/random', EmployeesController.getRandomEmployee);

router.get('/employees/:id', EmployeesController.getEmployeeById);

router.post('/employees', EmployeesController.postEmployee);

router.put('/employees/:id', EmployeesController.putEmployee);

router.delete('/employees/:id', EmployeesController.deleteEmployee);

module.exports = router;
