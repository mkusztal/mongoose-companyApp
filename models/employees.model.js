const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 3, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 3, maxlength: 20 },
  department: {
    type: String,
    required: true,
    ref: 'Department',
    minlength: 2,
    maxlength: 20,
  },
});

module.exports = mongoose.model('Employee', employeesSchema);
