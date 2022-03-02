import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { URL } from "./AuthContext";

interface ProductContextProps {
  products: any;
  isLoadingProduct: boolean;
  getProducts: (keyword: string, page: number, gender: string) => void;
  getNextProducts: (keyword: string, page: number, gender: string) => void;
}

const ProductContext = createContext<ProductContextProps>({
  products: {
    data: [],
    meta: {},
  },
  isLoadingProduct: false,
  getProducts: () => null,
  getNextProducts: () => null,
});

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [products, setProducts] = useState<any>({
    data: [],
    meta: {},
  });

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

  const getNextProducts = async (
    keyword: string,
    page: number,
    gender: string
  ) => {
    setIsLoadingProduct(true);
    await axios
      .get(`${URL}/product?keyword=${keyword}&page=${page}&gender=${gender}`)
      .then((res) => {
        const newProducts = {
          data: products.data.concat(res.data.data),
          meta: res.data.meta,
        };
        setProducts(newProducts);
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
        getNextProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
