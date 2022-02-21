import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { URL } from "./AuthContext";

interface ProductContextProps {
  products: any;
  isLoadingProduct: boolean;
  getProducts: (page: number) => void
}

const ProductContext = createContext<ProductContextProps>({
  products: null,
  isLoadingProduct: false,
  // @ts-ignore
  getProducts: (page = 1) => true
});

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      await getProducts(1);
    })();
  }, []);

  const getProducts = async (page: number) => {
    setIsLoadingProduct(true);
    await axios
      .get(`${URL}/product?page=${page}`)
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
        getProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
