import React, { createContext, ReactNode, useReducer, useEffect } from "react";
// Helper imports
import Apiclient, {
  ClientResponse,
  signIn,
  signOut,
  refreshToken,
} from "../helpers/apiClient";
// Payload imports
import { UserCredentials } from "../helpers/payloads";

export const AuthContext = createContext({});
const apiClient = new Apiclient("http://localhost:3001/");

type AuthProviderProps = {
  children?: ReactNode;
};

type AuthProviderState = {
  isLoading: boolean;
  isSignout: boolean;
  tokenAvailable: boolean;
};

type DispatchValue = {
  type: "signIn" | "signOut" | "restoreToken";
  token?: boolean;
};

export type AuthProviderPayload = {
  apiClient: Apiclient;
  signin(user: UserCredentials): Promise<ClientResponse>;
  signout(): Promise<void>;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  function reducer(prevState: AuthProviderState | any, action: DispatchValue) {
    switch (action.type) {
      case "restoreToken":
        return {
          ...prevState,
          tokenAvailable: action.token,
          isLoading: false,
        };
      case "signIn":
        return {
          ...prevState,
          isSignout: false,
          tokenAvailable: action.token,
        };
      case "signOut":
        return {
          ...prevState,
          isSignout: true,
          tokenAvailable: false,
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignout: false,
    tokenAvailable: false,
  }) as [AuthProviderState, React.Dispatch<DispatchValue>];

  useEffect(() => {
    const refresh = async () => {
      try {
        await refreshToken(apiClient);
        dispatch({ type: "restoreToken" });
      } catch (error) {
        console.log(error);
      }
    };

    if (state.isLoading) refresh();
  });

  const providerPayload: AuthProviderPayload = {
    apiClient: apiClient,
    signin: async (user: UserCredentials) => {
      const response = await signIn(apiClient, user);
      dispatch({ type: "signIn", token: apiClient.tokenLoaded });
      return response;
    },
    signout: async () => {
      await signOut(apiClient);
      dispatch({ type: "signOut" });
    },
  };
  return (
    <AuthContext.Provider value={providerPayload}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
