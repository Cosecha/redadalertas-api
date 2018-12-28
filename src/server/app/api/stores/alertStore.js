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
  updateAlert(payload) {
    return Alert.findOneAndUpdate(
      { _id: payload._id },
      { expireNow: true },
      { authLevel: false }
    );
  },
  getAlert(id) {
    return Alert.findById(id);
  },
  getAlerts() {
    return Alert.find();
  },
};

export default alertStore;
