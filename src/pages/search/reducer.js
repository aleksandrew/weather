// outsource dependencies

// local dependencies
import { TYPES } from '../home/types';

const initialState = {
  currentCity: null,
  inputData: '',
  loading: false,
};

export const selector = (state) => state.search;

const reducer = (state = initialState, action) => {
  const { type, ...options } = action;
  switch (type) {
    case TYPES.DATA: return {...state, ...options};

    case TYPES.CLEAR: return {...state, ...options};

    default: return state;
  }
};

export default reducer;
