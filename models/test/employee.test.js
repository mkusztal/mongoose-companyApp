const Employee = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if no args', () => {
    // create new Employee, but don't set  attrs value
    const em = new Employee({});

    em.validate((err) => {
      expect(err.errors).to.exist;
    });

    after(() => {
      mongoose.models = {};
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let employee of cases) {
      const em = new Employee({
        firstName: employee,
        lastName: employee,
        department: employee,
      });

      em.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if args is too short or too long', () => {
    // we test various cases, some of them are too short, some of them are too long
    const cases = [
      {
        firstName: 'Joe',
        lastName: 'Doe',
        department: 'Art',
      },
      {
        firstName: 'Rhoshandiatellyneshiaunneveshenk',
        lastName: 'Koyaanisquatsiuth',
        department: 'CEO',
      },
    ];
    for (let employee of cases) {
      const em = new Employee({
        firstName: employee,
        lastName: employee,
        department: employee,
      });

      em.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should not throw an error if args is correct', () => {
    const em = new Employee({
      firstName: 'John',
      lastName: 'Doe',
      department: 'Director',
    });

    em.validate((err) => {
      expect(err).to.not.exist;
    });
  });
});
