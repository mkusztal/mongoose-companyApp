const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  after(() => {
    mongoose.models = {};
  });

  it('should throw an error if no "name" arg', () => {
    // create new Department, but don't set `name` attr value
    const dep = new Department({});

    dep.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "name" is too short or too long', () => {
    // we test various cases, some of them are too short, some of them are too long
    const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should not throw an error if "name" is correct', () => {
    const cases = ['Managment', 'Director'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
