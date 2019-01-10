import { Alert } from '../../shared/models';

const alertStore = {
  // TO-DO: fill in authLevel stubs
  async createAlert(payload) {
    return Alert.create([{
      ...payload
    }], {
      authLevel: false
    });
  },
  updateAlert(id) {
    return Alert.findOneAndUpdate(
      { _id: id },
      { expireNow: true },
      { authLevel: false }
    );
  },
  getAlert(id) {
    return Alert.findById(id);
  },
  getAlerts() {
    return Alert.find({
      expireNow: false,
      "expire.at": { $gt: Date.now() }
    });
  },
  getAllAlerts() {
    return Alert.find();
  },
};

export default alertStore;
