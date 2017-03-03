import Lab from 'lab';
import { expect } from 'chai';
import Raid from '../../../app/shared/models/raid';

const lab = exports.lab = Lab.script();

lab.experiment('Raid model', () => {

  lab.test('It has a description', (done) => {
    let raid = Raid({
      description: 'Some description'
    });
    expect(raid.description).to.eq('Some description');
    done();
  });

  lab.test('It has a date', (done) => {
    let now = new Date();
    let raid = Raid({
      date: now
    });
    expect(raid.date).to.eq(now);
    done();
  });

  lab.test('It requires a date', (done) => {
    let raid = Raid();
    raid.validate((err) => {
      expect(err.errors.date).to.exist;
      done();
    });
  });

  lab.test('It has a location', (done) => {
    let longitude = -112.097008;
    let latitude = 33.448304;
    let raid = Raid({
      location: [longitude, latitude]
    });
    expect(raid.location[0]).to.eq(longitude);
    expect(raid.location[1]).to.eq(latitude);
    done();
  });

  lab.test('It requires a location', (done) => {
    let raid = Raid();
    raid.validate((err) => {
      expect(err.errors.location).to.exist;
      done();
    });
  });

  lab.test('It is unverified by default', (done) => {
    let raid = Raid();
    expect(raid.verified).to.be.false;
    done();
  });

  lab.test('It can be verified', (done) => {
    let raid = Raid({
      verified: true
     });
    expect(raid.verified).to.be.true;
    done();
  });

  lab.test('It requires verified', (done) => {
    const raid = Raid();
    raid.verified = undefined;
    raid.validate((err) => {
      expect(err.errors.verified).to.exist;
      done();
    });
  });

  lab.test('It has a type', (done) => {
    let homeRaid = Raid({
      type: 'home'
    });
    expect(homeRaid.type).to.eq('home');

    let workplaceRaid = Raid({
      type: 'workplace'
    });
    expect(workplaceRaid.type).to.eq('workplace');
    done();
  });

  lab.test('It validates type', (done) => {
    let raid = Raid({
      type: 'this is not a valid type'
    });
    raid.validate((err) => {
      expect(err.errors.type).to.exist;
      done();
    });
  });

  lab.test('It requires a type', (done) => {
    let raid = Raid();
    raid.validate((err) => {
      expect(err.errors.type).to.exist;
      done();
    });
  });
});
