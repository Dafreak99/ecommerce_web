import { useContext } from "react";
import { createContext, useEffect, useState } from "react";

interface ContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  adminToken: string | null;
  setAdminToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: () => boolean;
  isAdminLoggedIn: () => boolean;
  logout: () => void;
  adminLogout: () => void;
}

const authContext = createContext<ContextProps>({} as ContextProps);

const token = localStorage.getItem("token");
const adminToken = localStorage.getItem("admin_token");

const TOKEN = token !== null ? token : null;
const ADMIN_TOKEN = adminToken !== null ? adminToken : null;

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useProvideAuth = () => {
  const [token, setToken] = useState(TOKEN);
  const [adminToken, setAdminToken] = useState(ADMIN_TOKEN);

  const isLoggedIn = () => !!token;
  const isAdminLoggedIn = () => !!adminToken;

  const logout = () => {
    setToken(null);
  };

  const adminLogout = () => {
    setAdminToken(null);
  };

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", token);
    }
  }, [token]);

  useEffect(() => {
    if (!adminToken) {
      localStorage.removeItem("admin_token");
    } else {
      localStorage.setItem("admin_token", adminToken);
    }
  }, [adminToken]);

  return {
    token,
    setToken,
    adminToken,
    setAdminToken,
    isLoggedIn,
    isAdminLoggedIn,
    logout,
    adminLogout,
  };
};

export const useAuth = () => {
  return useContext(authContext);
};
