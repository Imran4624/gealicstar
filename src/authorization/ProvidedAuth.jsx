import React, { createContext, useContext } from "react";
const authContext = createContext();

export function ProvideAuth({ children }) {
  return <authContext.Provider>{children}</authContext.Provider>;
}
export function useAuth() {
  return useContext(authContext);
}
