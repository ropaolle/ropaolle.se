import { useState, useEffect, createContext, useReducer, useContext } from 'react';
import getConfig from 'next/config';
import { SETTING } from '../graphql/settings';
import { useQuery } from 'react-apollo';
import { useAuth } from '../lib/useAuth';

const {
  publicRuntimeConfig: { websocketUrl },
} = getConfig();

const initialState = { clients: [], anonymousClients: 0, state3cx: {} };

const SET_LANGUAGE = 'SET_LANGUAGE';
export const setLanguage = payload => ({ type: SET_LANGUAGE, payload });

/* Action Types */
const SET_WEBSOCKET_CLIENTS = 'SET_WEBSOCKET_CLIENTS';
const SET_WEBSOCKET = 'SET_WEBSOCKET';
const SET_3CX_STATE = 'SET_3CX_STATE';

/* Actions */
export const set3cxState = payload => ({ type: SET_3CX_STATE, payload });
export const setWebsocketClients = payload => ({ type: SET_WEBSOCKET_CLIENTS, payload });
export const setWebsocket = payload => ({ type: SET_WEBSOCKET, payload });

const WebsocketContext = createContext();

const websocketReducer = (state, action) => {
  switch (action.type) {
    case SET_3CX_STATE:
      return {
        ...state,
        state3cx: action.payload,
      };
    case SET_WEBSOCKET_CLIENTS:
      return {
        ...state,
        websocketClients: action.payload,
      };
    case SET_WEBSOCKET:
      return {
        ...state,
        ws: action.payload,
      };
    default:
      return state;
  }
};

export const WebsocketProvider = ({ children /* , initialState */ }) => {
  const [state, dispatch] = useReducer(websocketReducer, initialState);

  return (
    <WebsocketContext.Provider value={[state, dispatch]}>
      <Websockets />
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => useContext(WebsocketContext);

export const Websockets = () => {
  const [ws, setWs] = useState();
  const [, dispatch] = useWebsocket();
  const { data, loading } = useQuery(SETTING, { variables: { name: 'state' } });
  const { user, isLoading } = useAuth();
  const { name, email } = user || {};

  // Load initial state
  useEffect(() => {
    if (!loading) {
      dispatch(set3cxState(data?.allSettings?.[0].value));
    }
  }, [loading]);

  useEffect(() => {
    if (!ws && process.browser && !isLoading) {
      const ws = new global.WebSocket(`${websocketUrl}?name=${name}&email=${email}`);
      setWs(ws);

      dispatch(setWebsocket(ws));

      // ws.onopen = () => console.info('open');
      // ws.onclose = () => console.info('close');
      ws.onerror = e => console.error('error', e);

      ws.onmessage = msg => {
        try {
          const data = JSON.parse(msg.data);
          if (data) {
            if (data.state) {
              dispatch(set3cxState(data.state));
            }

            // Handle client connection list
            if (data.websocketClients) {
              const { anonymousClients, clients } = data.websocketClients;
              dispatch(setWebsocketClients({ clients, anonymousClients }));
            }
          }
        } catch (error) {
          console.error('error', error);
        }
      };
    }
  }, [isLoading]);

  return null;
};
