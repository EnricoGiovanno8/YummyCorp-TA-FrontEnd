import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "./AuthContext";
import createStripe from "stripe-client";

const stripe = createStripe(
  "pk_test_51KKDpVKuasnJKlhE4grMDh8rDlvGqxZaIiPiAx90HrxOvHgTahlirUbPrAyGy4DTBmr3mdrESEgXLXqDltuNwysJ00mooIakDc"
);

interface CheckoutContextType {
  cards: any[];
  isLoading: boolean;
  createNewCard: (body: any) => any;
  deleteCard: (id: number) => any;
  onPayRequest: (body: any) => any;
}

const CheckoutContext = createContext<CheckoutContextType>({
  cards: [],
  isLoading: false,
  createNewCard: () => true,
  deleteCard: () => true,
  onPayRequest: () => true,
});

interface CheckoutProviderProps {
  children: ReactNode;
}

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [cards, setCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const onPayRequest = async (body: any) => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("token");
    const card = {
      name: body.cardToken.user.name,
      number: body.cardToken.number,
      exp_month: body.cardToken.expMonth,
      exp_year: body.cardToken.expYear,
      cvc: body.cardToken.cvc,
    };
    const info = await stripe.createToken({ card });
    if (token) {
      const data = {
        token: info.id,
        amount: body.totalPrice,
        name: body.cardToken.user.name,
      };
      return await axios
        .post(`${URL}/order/pay`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setIsLoading(false);
          return res.data;
        })
        .catch((err) => {
          if (Array.isArray(err?.response?.data?.message)) {
            console.log(err.response.data.message[0]);
            setIsLoading(false);
          } else if (err?.response?.data?.message) {
            console.log(err.response.data.message);
            setIsLoading(false);
          } else if (err?.message) {
            console.log(err.message);
            setIsLoading(false);
          }
        });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{ cards, isLoading, createNewCard, deleteCard, onPayRequest }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
