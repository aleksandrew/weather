// outsource dependencies

// local dependencies
import { TYPES } from '../constans/types';

const initialState = {
  data: [],
};

export const selector = (state) => state.app;

const app = (state = initialState, action) => {
  const { type, ...options } = action;
  switch (type) {
    case TYPES.DATA: return {...state, ...options};

    case TYPES.CLEAR: return {...state, ...options};

    default: return state;
  }
};

export default app;
