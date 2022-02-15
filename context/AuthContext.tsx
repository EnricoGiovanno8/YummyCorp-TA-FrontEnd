import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
const URL = "http://192.168.100.13:8000/api";

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
  user: any;
  error: string;
  register: (body: Register) => any;
  login: (body: Login) => any;
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  error: "",
  register: () => true,
  login: () => true,
  logout: () => true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      await checkUserLoggedIn();
    })();
  }, []);

  const register = async (body: Register) => {
    let user;
    await axios
      .post(`${URL}/register`, body)
      .then((res) => {
        user = res.data;
      })
      .catch((err) => {
        if (Array.isArray(err?.response?.data?.message)) {
          setError(err.response.data.message[0]);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
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
        await AsyncStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        if (Array.isArray(err?.response?.data?.message)) {
          setError(err.response.data.message[0]);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
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
    await AsyncStorage.removeItem("token").catch(() => console.log("gagal hapus token"))
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
