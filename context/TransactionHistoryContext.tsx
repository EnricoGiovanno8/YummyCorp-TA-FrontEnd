import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "./AuthContext";

interface TransactionHistoryContextType {
  histories: any;
  totalAmountOneYear: any;
  getHistories: (month: string) => any;
  getHistoryOneYear: () => any;
}

const TransactionHistoryContext = createContext<TransactionHistoryContextType>({
  histories: [],
  totalAmountOneYear: [],
  getHistories: () => true,
  getHistoryOneYear: () => true,
});

interface TransactionHistoryProviderProps {
  children: ReactNode;
}

export const TransactionHistoryProvider = ({
  children,
}: TransactionHistoryProviderProps) => {
  const [histories, setHistories] = useState<any[]>([]);
  const [totalAmountOneYear, setTotalAmountOneYear] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let month = (new Date().getMonth() + 1).toString();
      if (month.length === 1) {
        month = "0" + month;
      }
      await getHistories(month);
      await getHistoryOneYear();
    })();
  }, []);

  const getHistories = async (month: string) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .get(`${URL}/order?month=${month}`, {
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

  const getHistoryOneYear = async () => {
    let tempArr: any = [];
    for (let i = 0; i < 12; i++) {
      let month = (i + 1).toString();
      if (month.length === 1) {
        month = "0" + month;
      }
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await axios
          .get(`${URL}/order?month=${month}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            tempArr.push(
              res.data.reduce((a: number, b: any) => a + b.totalAmount, 0)
            );
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
    }
    setTotalAmountOneYear(tempArr);
  };

  return (
    <TransactionHistoryContext.Provider
      value={{ histories, totalAmountOneYear, getHistories, getHistoryOneYear }}
    >
      {children}
    </TransactionHistoryContext.Provider>
  );
};

export default TransactionHistoryContext;
