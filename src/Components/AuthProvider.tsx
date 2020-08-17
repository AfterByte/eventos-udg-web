import React, { createContext, ReactChildren } from 'react';
// Helper imports
import EventosudgApiClient from '../helpers/apiClient';

export const AuthContext = createContext({});

type AuthProviderProps = {
  children: ReactChildren;
};

const AuthProvider = ({children}: AuthProviderProps) => {
  const apiClient = new EventosudgApiClient('');
  return (
    <AuthContext.Provider value={apiClient}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;
