import { Actions, ActionTypes } from '@app/root-store/providers/actions';
import { featureAdapter, initialState, State } from '@app/root-store/providers/state';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      return featureAdapter.addAll(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
