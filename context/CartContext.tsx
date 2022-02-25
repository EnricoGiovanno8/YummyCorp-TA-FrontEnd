import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "./AuthContext";

interface CartContextProps {
  cart: any[];
  addToCart: (data: any) => any;
  getUserCart: () => any;
  deleteCartItem: (id: any) => any;
  updateQuantity: (body: any) => any;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => true,
  getUserCart: () => true,
  deleteCartItem: () => true,
  updateQuantity: () => true,
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await getUserCart();
    })();
  }, []);

  const getUserCart = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .get(`${URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setCart(res.data);
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

  const addToCart = async (data: any) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      return await axios
        .post(`${URL}/cart`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async () => {
          await getUserCart();
          return "SUCCESS";
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

  const deleteCartItem = async (body: any) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      return await axios
        .delete(`${URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
          data: {
            ...body,
          },
        })
        .then(async (res) => {
          await getUserCart();
          return res.data;
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

  const updateQuantity = async (body: any) => {
    const token = await AsyncStorage.getItem("token");
    const { id, quantity } = body;
    if (token) {
      return await axios
        .patch(
          `${URL}/cart/${id}`,
          { quantity },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(async (res) => {
          await getUserCart();
          return res.data;
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
    <CartContext.Provider
      value={{ cart, addToCart, getUserCart, deleteCartItem, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
