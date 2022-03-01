import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "./AuthContext";

interface CardContextType {
  cards: any[];
  createNewCard: (body: any) => any;
  deleteCard: (id: number) => any;
}

const CardContext = createContext<CardContextType>({
  cards: [],
  createNewCard: () => true,
  deleteCard: () => true
});

interface CardProviderProps {
  children: ReactNode;
}

export const CardProvider = ({ children }: CardProviderProps) => {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await getUserCard();
    })();
  }, []);

  const getUserCard = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .get(`${URL}/card`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setCards(res.data);
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

  const createNewCard = async (body: any) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .post(`${URL}/card`, body, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async () => {
          await getUserCard();
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

  const deleteCard = async (id: number) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      return await axios
        .delete(`${URL}/card/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async () => {
          await getUserCard();
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
    <CardContext.Provider value={{ cards, createNewCard, deleteCard }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;
