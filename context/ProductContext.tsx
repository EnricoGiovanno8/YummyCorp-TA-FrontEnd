import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { URL } from "./AuthContext";

interface ProductContextProps {
  products: any;
  isLoadingProduct: boolean;
  getProducts: (keyword: string, page: number, gender: string) => void;
}

const ProductContext = createContext<ProductContextProps>({
  products: null,
  isLoadingProduct: false,
  // @ts-ignore
  getProducts: (keyword = "", page = 1, gender = "") => true,
});

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      await getProducts("", 1, "");
    })();
  }, []);

  const getProducts = async (keyword: string, page: number, gender: string) => {
    setIsLoadingProduct(true);
    await axios
      .get(`${URL}/product?keyword=${keyword}&page=${page}&gender=${gender}`)
      .then((res) => {
        setProducts(res.data);
        setIsLoadingProduct(false);
      })
      .catch((err) => {
        if (Array.isArray(err?.response?.data?.message)) {
          console.log(err.response.data.message[0]);
          setIsLoadingProduct(false);
        } else if (err?.response?.data?.message) {
          console.log(err.response.data.message);
          setIsLoadingProduct(false);
        } else if (err?.message) {
          console.log(err.message);
          setIsLoadingProduct(false);
        }
      });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoadingProduct,
        getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
