
const DEFAULT_CURRENT_UID = {
  currentUID: ''
};

const currentUID = (state = DEFAULT_CURRENT_UID, action) => {
  switch (action.type) {
    case 'SET_CURRENT_UID':
      return action.currentUID;
    default:
      return state;
  }
};

export default currentUID;
