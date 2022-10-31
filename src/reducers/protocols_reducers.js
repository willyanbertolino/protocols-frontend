import { GET_ALL_PROTOCOLS, UPDATE_FILTER, UPDATE_PROTOCOL } from '../actions';

const protocols_reducer = (state, action) => {
  if (action.type === GET_ALL_PROTOCOLS) {
    return {
      ...state,
      protocols: action.payload,
      protocols_filtered: action.payload,
    };
  }

  if (action.type === UPDATE_FILTER) {
    const { protocols } = state;

    let temp = [];
    temp = protocols.filter((item) => {
      return item.requester
        .toLowerCase()
        .includes(action.payload.toLowerCase());
    });

    return {
      ...state,
      filter: action.payload,
      protocols_filtered: temp,
    };
  }

  if (action.type === UPDATE_PROTOCOL) {
    const { protocols } = state;

    let update = protocols.find((item) => item._id === action.payload);

    return {
      ...state,
      protocol_to_update: {
        id: update._id,
        requester: update.requester,
        email: update.email,
        description: update.description,
      },
    };
  }

  throw new Error(`No matching ${action.type} - action type`);
};

export default protocols_reducer;
