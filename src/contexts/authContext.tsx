import { useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import Axios from "../helpers/axios";
import { LoginFormValues } from "../pages/Login";
import { RegisterFormValues } from "../pages/Register";
import { useHistory } from "react-router-dom";
interface ContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  adminToken: string | null;
  setAdminToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: () => boolean;
  isAdminLoggedIn: () => boolean;
  adminLogin: (data: LoginFormValues) => Promise<void>;
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

  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const history = useHistory();

  const isLoggedIn = () => !!token;
  const isAdminLoggedIn = () => !!adminToken;

  const adminLogin = async (data: LoginFormValues) => {
    const res = await Axios.post("/api/v2/public/auth/login", data);
    setAdminToken(res.data);
  };

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
    adminLogin,
    logout,
    adminLogout,
  };
};

export const useAuth = () => {
  return useContext(authContext);
};
