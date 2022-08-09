const express = require('express');
const router = express.Router();
const EmployeesController = require('../controllers/employees.controller');

router.get('/employees', EmployeesController.getAllEmployees);

router.get('/employees/random', EmployeesController.getRandomEmployee);

router.get('/employees/:id', EmployeesController.getEmployeeById);

router.post('/employees', EmployeesController.addEmployee);

router.put('/employees/:id', EmployeesController.updateEmployeeById);

router.delete('/employees/:id', EmployeesController.removeEmployeeById);

module.exports = router;
