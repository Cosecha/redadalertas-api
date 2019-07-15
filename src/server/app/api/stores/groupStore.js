import { Group } from '../../shared/models';

const groupStore = {
  getGroup(id) {
    return Group.findById(id);
  },
}

export default groupStore;
