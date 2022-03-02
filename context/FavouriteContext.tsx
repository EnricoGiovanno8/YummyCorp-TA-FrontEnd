import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "./AuthContext";

interface FavouriteContextType {
  favourites: any;
  getFavourites: (page: number) => any;
  getNextFavourites: (page: number) => any;
  addToFavourite: (productId: number) => any;
  removeFromFavourite: (favouriteId: number) => any;
}

const FavouriteContext = createContext<FavouriteContextType>({
  favourites: {
    data: [],
    meta: {},
  },
  getFavourites: () => true,
  getNextFavourites: () => true,
  addToFavourite: () => true,
  removeFromFavourite: () => true,
});

interface FavouriteProviderProps {
  children: ReactNode;
}

export const FavouriteProvider = ({ children }: FavouriteProviderProps) => {
  const [favourites, setFavourites] = useState<any>({
    data: [],
    meta: {},
  });

  useEffect(() => {
    (async () => {
      await getFavourites(1);
    })();
  }, []);

  const getFavourites = async (page: number) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .get(`${URL}/favourite?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setFavourites(res.data);
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

  const getNextFavourites = async (page: number) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .get(`${URL}/favourite?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const newFavourites = {
            data: favourites.data.concat(res.data.data),
            meta: res.data.meta,
          };
          setFavourites(newFavourites);
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

  const addToFavourite = async (productId: number) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .post(
          `${URL}/favourite`,
          { productId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          getFavourites(1);
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

  const removeFromFavourite = async (favouriteId: number) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .delete(`${URL}/favourite/${favouriteId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          getFavourites(1);
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
    <FavouriteContext.Provider
      value={{
        favourites,
        getFavourites,
        getNextFavourites,
        addToFavourite,
        removeFromFavourite,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteContext;
