const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: 'Carl',
        lastName: 'Day',
        department: 'Marketing',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Klara',
        lastName: 'Day',
        department: 'IT',
      });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "firstName" with "findOne" method', async () => {
      const employee = await Employee.findOne({
        firstName: 'Carl',
        lastName: 'Day',
        department: 'Marketing',
      });
      const expectedFirstName = 'Carl';
      expect(employee.firstName).to.be.equal(expectedFirstName);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Create data', () => {
    it('should return new document with "insertOne" method', async () => {
      const employee = new Employee({
        firstName: 'Carl',
        lastName: 'Day',
        department: 'Marketing',
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: 'Carl',
        lastName: 'Day',
        department: 'Marketing',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Klara',
        lastName: 'Day',
        department: 'IT',
      });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        { firstName: 'Carl' },
        { $set: { firstName: '=Carl=' } }
      );
      const updateEmployee = await Employee.findOne({
        firstName: '=Carl=',
      });
      expect(updateEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Klara' });
      employee.firstName = '=Klara=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: '=Klara=',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
      const employees = await Employee.find();
      expect(employees[0].firstName).to.be.equal('Updated!');
      expect(employees[1].firstName).to.be.equal('Updated!');
    });
  });

  afterEach(async () => {
    await Employee.deleteMany();
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: 'Carl',
        lastName: 'Day',
        department: 'Marketing',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Klara',
        lastName: 'Day',
        department: 'IT',
      });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'Carl' });
      const deleteEmployee = await Employee.findOne({
        firstName: 'Carl',
      });
      expect(deleteEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Carl' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({
        firstName: 'Carl',
      });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});
