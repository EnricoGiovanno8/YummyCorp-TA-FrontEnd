import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
export const URL = "http://192.168.1.5:8000/api";

// interface User {
//   id: number;
//   email: string;
//   name: string;
//   gender: string;
//   address: string;
// }

interface Register {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface Login {
  email: string;
  password: string;
  remember: boolean;
}

interface AuthContextProps {
  isLoading: boolean;
  user: any;
  errorRegister: string;
  errorLogin: string;
  clearErrorLogin: () => void;
  clearErrorRegister: () => void;
  register: (body: Register) => any;
  login: (body: Login) => any;
  logout: () => void;
  updateUser: (body: any) => any;
}

const AuthContext = createContext<AuthContextProps>({
  isLoading: false,
  user: null,
  errorRegister: "",
  errorLogin: "",
  clearErrorLogin: () => true,
  clearErrorRegister: () => true,
  register: () => true,
  login: () => true,
  logout: () => true,
  updateUser: () => true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [errorRegister, setErrorRegister] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  useEffect(() => {
    (async () => {
      await checkUserLoggedIn();
    })();
  }, []);

  const clearErrorLogin = () => {
    setErrorLogin("");
  };

  const clearErrorRegister = () => {
    setErrorRegister("");
  };

  const register = async (body: Register) => {
    setIsLoading(true);
    let user;
    await axios
      .post(`${URL}/register`, body)
      .then((res) => {
        user = res.data;
        setErrorRegister("");
        setIsLoading(false);
      })
      .catch((err) => {
        if (Array.isArray(err?.response?.data?.message)) {
          setErrorRegister(err.response.data.message[0]);
          setIsLoading(false);
        } else if (err?.response?.data?.message) {
          setErrorRegister(err.response.data.message);
          setIsLoading(false);
        } else if (err?.message) {
          setErrorRegister(err.message);
          setIsLoading(false);
        }
      });

    return user;
  };

  const rememberMe = async (remember: boolean, email?: string) => {
    if (remember && email) {
      await AsyncStorage.setItem("remember", email);
    } else {
      await AsyncStorage.removeItem("remember");
    }
  };

  const login = async (body: Login) => {
    setIsLoading(true);
    const { remember, email } = body;
    if (remember) {
      rememberMe(remember, email);
    } else {
      rememberMe(remember);
    }

    let user;
    await axios
      .post(`${URL}/login`, body)
      .then(async (res) => {
        user = res.data.user;
        setUser(user);
        setErrorLogin("");
        await AsyncStorage.setItem("token", res.data.token);
        setIsLoading(false);
      })
      .catch((err) => {
        if (Array.isArray(err?.response?.data?.message)) {
          setErrorLogin(err.response.data.message[0]);
          setIsLoading(false);
        } else if (err?.response?.data?.message) {
          setErrorLogin(err.response.data.message);
          setIsLoading(false);
        } else if (err?.message) {
          setErrorLogin(err.message);
          setIsLoading(false);
        }
      });

    return user;
  };

  const checkUserLoggedIn = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .get(`${URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => console.log("GAGAL CHECK USER PAKE TOKEN"));
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("token").catch(() =>
      console.log("gagal hapus token")
    );
  };

  const updateUser = async (body: any) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .patch(`${URL}/users`, body, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          if (Array.isArray(err?.response?.data?.message)) {
            setErrorLogin(err.response.data.message[0]);
            setIsLoading(false);
          } else if (err?.response?.data?.message) {
            setErrorLogin(err.response.data.message);
            setIsLoading(false);
          } else if (err?.message) {
            setErrorLogin(err.message);
            setIsLoading(false);
          }
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        errorRegister,
        errorLogin,
        clearErrorLogin,
        clearErrorRegister,
        register,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
