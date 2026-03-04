"use client";
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';
import { loadToken } from '../store/user';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StoreInitializer>{children}</StoreInitializer>
      </Provider>
    </QueryClientProvider>
  );
};
