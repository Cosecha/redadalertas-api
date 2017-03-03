import Lab from 'lab';
import { expect } from 'chai';
import RaidStore from '../../../app/api/stores/raidStore';
import Raid from '../../../app/shared/models/raid';

const lab = exports.lab = Lab.script();

lab.experiment('Raid store', () => {

  lab.before((done) => {
    Raid.remove({}, done);
  });

  lab.afterEach((done) => {
    Raid.remove({}, done);
  });

  lab.describe('Create', () => {

    lab.test('It creates a raid', (done) => {
      let payload = {
        date: new Date(),
        location: [-112.097008, 33.448304],
        type: 'workplace'
      };
      RaidStore.createRaid(payload).then((raid) => {
        expect(raid).not.to.be.null;
        done();
      });
    });

    lab.test('It is unverified by default', (done) => {
      let payload = {
        date: new Date(),
        location: [-112.097008, 33.448304],
        type: 'workplace'
      };
      RaidStore.createRaid(payload).then((raid) => {
        expect(raid.verified).to.be.false;
        done();
      });
    });

    lab.test('It handles descriptions', (done) => {
      let payload = {
        date: new Date(),
        description: 'Some description',
        location: [-112.097008, 33.448304],
        type: 'workplace'
      };
      RaidStore.createRaid(payload).then((raid) => {
        expect(raid.description).to.eql('Some description');
        done();
      });
    });
  });

  lab.describe('Read', () => {

    lab.test('It reads a raid', (done) => {
      let payload = {
        date: new Date(),
        location: [-112.097008, 33.448304],
        type: 'workplace'
      };
      RaidStore.createRaid(payload).then((createdRaid) => {
        RaidStore.getRaid({_id: createdRaid._id}).then((readRaid) => {
          expect(readRaid._id).to.eql(createdRaid._id);
          expect(readRaid.date).to.eql(createdRaid.date);
          expect(readRaid.location[0]).to.eql(createdRaid.location[0]);
          expect(readRaid.location[1]).to.eql(createdRaid.location[1]);
          expect(readRaid.type).to.eql(createdRaid.type);
          expect(readRaid.verified).to.eql(createdRaid.verified);
          done();
        });
      });
    });
  });

  lab.describe('Read all', () => {

    lab.test('It reads all raids', (done) => {
      let workplace = {
        date: new Date(),
        location: [-112.097008, 33.448304],
        type: 'workplace'
      };
      let home = {
        date: new Date(),
        location: [-112.097008, 33.448304],
        type: 'home'
      };
      RaidStore.createRaid(workplace).then(() => {
        RaidStore.createRaid(home).then(() => {
          RaidStore.getRaids().then((raids) => {
            expect(raids.length).to.eql(2);
            done();
          });
        });
      });
    });
  });
});
