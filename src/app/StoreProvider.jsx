"use client";
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';
import { loadToken } from '../store/user';

// This is a wrapper component to load the token on the client side
const StoreInitializer = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  return <>{children}</>;
};


export const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <StoreInitializer>{children}</StoreInitializer>
    </Provider>
  );
};
