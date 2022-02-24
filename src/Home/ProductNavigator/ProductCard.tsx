import React from "react";
import { Image } from "react-native";
import { URL } from "../../../context";
import { Box, Text } from "../../components";

interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const getProductPrice = () => {
    const arrayOfPrice = product.productStocks.map(
      ({ price }: { price: number }) => price
    );
    let price = arrayOfPrice.reduce((priceA: number, priceB: number) =>
      Math.min(priceA, priceB)
    );
    price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return price;
  };
  return (
    <Box
      backgroundColor="background"
      // @ts-ignore
      borderRadius="m"
      flexDirection="column"
      overflow="hidden"
      borderWidth={1}
      style={{ borderColor: "rgba(0,0,0,0.1)" }}
      marginBottom="m"
    >
      <Box height={200} backgroundColor="background">
        <Image
          source={{ uri: `${URL}/product-image/${product.image}` }}
          style={{
            resizeMode: "cover",
            height: "100%",
          }}
        />
      </Box>
      <Box padding="s">
        <Text variant="productName">{product.name}</Text>
        <Text variant="productPrice" marginBottom="s">
          Brand: {product.brand}
        </Text>
        <Box
          backgroundColor={product.gender === "Men" ? "men" : "women"}
          style={{
            padding: 3,
            borderRadius: 3,
            width: product.gender === "Men" ? 35.5 : 57.2,
          }}
          marginBottom="s"
        >
          <Text variant="productPrice" color="background">
            {product.gender}
          </Text>
        </Box>
        <Text variant="productStartsFrom">Starts from</Text>
        <Text variant="productPrice">Rp {getProductPrice()}</Text>
      </Box>
    </Box>
  );
};

export default ProductCard;
