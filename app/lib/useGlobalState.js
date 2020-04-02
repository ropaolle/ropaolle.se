import { createContext, useReducer, useContext /* , useEffect */ } from 'react';

/* Action Types */
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

/* Actions */
export const setUser = payload => ({ type: SET_USER, payload });
export const clearUser = () => ({ type: CLEAR_USER });

const GlobalStateContext = createContext();

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const GlobalStateProvider = props => {
  const { children, initialState } = props;
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>{children}</GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
