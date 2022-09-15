import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/protocols_reducers';
import axios from 'axios';
import { GET_ALL_PROTOCOLS, UPDATE_FILTER, UPDATE_PROTOCOL } from '../actions';

const initialState = {
  protocols: [],
  protocols_filtered: [],
  filter: '',
  protocol_to_update: {},
  page: '',
  max: '',
};

const ProtocolContext = React.createContext();

const ProtocolProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setFilter = (key) => {
    dispatch({ type: UPDATE_FILTER, payload: key });
  };

  const updateProtocol = (id) => {
    dispatch({ type: UPDATE_PROTOCOL, payload: id });
  };

  const getProtocols = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/protocols?page=${state.page}&max=${state.max}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchSingleProduct = async (id) => {
  //   try {
  //     const { data } = await axios.get(`/api/v1/protocols/${id}`);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    async function fetchData() {
      const { protocols } = await getProtocols();
      if (protocols.length !== 0) {
        dispatch({ type: GET_ALL_PROTOCOLS, payload: protocols });
      }
    }
    fetchData();
  }, [state.page, state.max]);

  return (
    <ProtocolContext.Provider
      value={{
        ...state,
        setFilter,
        updateProtocol,

        // fetchProducts,
        // fetchSingleProduct,
      }}
    >
      {children}
    </ProtocolContext.Provider>
  );
};

export const useProtocolContext = () => {
  return useContext(ProtocolContext);
};

export { ProtocolProvider };
