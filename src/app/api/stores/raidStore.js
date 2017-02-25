import Raid from '../../shared/models/raid';

const raidStore = {
  createRaid(payload) {
    return Raid.create({
      date: payload.date,
      description: payload.description,
      location: payload.location,
      type: payload.type,
    });
  },
};

export default raidStore;
