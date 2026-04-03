import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // helper functions
  const startLoading = () => {
    setLoading(true);
    setError(null); // clear old errors
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const setErrorMessage = (msg) => {
    setError(msg);
    setLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        error,
        startLoading,
        stopLoading,
        setErrorMessage,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

// custom hook
export function useLoading() {
  return useContext(LoadingContext);
}