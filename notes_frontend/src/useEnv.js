//
// Loads .env variables for use throughout the React application,
// acting as a utility for accessing environment configuration.
//
export function useEnv(key, fallback = "") {
  // In Create React App, env vars must be prefixed with REACT_APP_
  const value = process.env["REACT_APP_" + key] || process.env[key] || fallback;
  return value;
}
