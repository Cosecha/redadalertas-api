import { Alert } from '../../shared/models';

const alertStore = {
  async createAlert(payload) {
    return Alert.create([{
      ...payload
    }]);
  },
  updateAlert(id) {
    return Alert.findOneAndUpdate(
      { _id: id },
      { expireNow: true }
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
