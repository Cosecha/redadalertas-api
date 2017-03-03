import Lab from 'lab';
import Joi from 'joi';
import { expect } from 'chai';
import { raid } from '../../../../app/api/routes/raids/config';

const lab = exports.lab = Lab.script();

lab.experiment('Raid validation', () => {

  lab.test('Location requires both lon and lat', (done) => {
    let data = {
      date: new Date(),
      description: 'Some description',
      location: [-112.097008],
      type: 'workplace'
    };
    Joi.validate(data, raid.validate.payload, (err, value) => {
      let errorMessage = err.details[0].message;
      expect(errorMessage).to.eql('"location" must contain at least 2 items');
      done();
    });
  });

  lab.test('Location requires exactly two coordinates', (done) => {
    let data = {
      date: new Date(),
      description: 'Some description',
      location: [-112.097008, 33.448304, 55.643201],
      type: 'workplace'
    };
    Joi.validate(data, raid.validate.payload, (err, value) => {
      let errorMessage = err.details[0].message;
      expect(errorMessage).to.eql('"location" must contain less than or equal to 2 items');
      done();
    });
  });

});
