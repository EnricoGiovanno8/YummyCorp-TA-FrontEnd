import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "./AuthContext";

interface TransactionHistoryContextType {
  histories: any;
  getHistories: (page: number) => any;
  getNextHistories: (page: number) => any;
}

const TransactionHistoryContext = createContext<TransactionHistoryContextType>({
  histories: {
    data: [],
    meta: {},
  },
  getHistories: () => true,
  getNextHistories: () => true,
});

interface TransactionHistoryProviderProps {
  children: ReactNode;
}

export const TransactionHistoryProvider = ({
  children,
}: TransactionHistoryProviderProps) => {
  const [histories, setHistories] = useState<any>({
    data: [],
    meta: {},
  });

  useEffect(() => {
    (async () => {
      await getHistories(1);
    })();
  }, []);

  const getHistories = async (page: number) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .get(`${URL}/order?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setHistories(res.data);
        })
        .catch((err) => {
          if (Array.isArray(err?.response?.data?.message)) {
            console.log(err.response.data.message[0]);
          } else if (err?.response?.data?.message) {
            console.log(err.response.data.message);
          } else if (err?.message) {
            console.log(err.message);
          }
        });
    }
  };

  const getNextHistories = async (page: number) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .get(`${URL}/order?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const newHistories = {
            data: histories.data.concat(res.data.data),
            meta: res.data.meta,
          };
          setHistories(newHistories);
        })
        .catch((err) => {
          if (Array.isArray(err?.response?.data?.message)) {
            console.log(err.response.data.message[0]);
          } else if (err?.response?.data?.message) {
            console.log(err.response.data.message);
          } else if (err?.message) {
            console.log(err.message);
          }
        });
    }
  };

  return (
    <TransactionHistoryContext.Provider value={{ histories, getHistories, getNextHistories }}>
      {children}
    </TransactionHistoryContext.Provider>
  );
};

export default TransactionHistoryContext;
