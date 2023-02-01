import {
  GET_ALL_PROTOCOLS,
  UPDATE_FILTER,
  UPDATE_PROTOCOL,
  CHANGE_PAGE,
} from '../actions';

const protocols_reducer = (state, action) => {
  if (action.type === GET_ALL_PROTOCOLS) {
    const { protocols, maxPage } = action.payload;
    return {
      ...state,
      protocols,
      maxPage,
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload,
    };
  }

  if (action.type === UPDATE_FILTER) {
    return {
      ...state,
      filter: action.payload,
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
