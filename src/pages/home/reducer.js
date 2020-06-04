// outsource dependencies

// local dependencies
import { TYPES } from './types';

const initialState = {
    data: null,
    loading: false,
};

export const selector = (state) => state.home;

const reducer = (state = initialState, action) => {
    const { type, ...options } = action;
    switch (type) {
        case TYPES.DATA: return { ...state, ...options };

        case TYPES.CLEAR: return { ...state, ...options };

        default: return state;
    }
};

export default reducer;
