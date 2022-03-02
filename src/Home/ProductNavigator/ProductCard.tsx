import React, { useContext } from "react";
import { Image, TouchableOpacity } from "react-native";
import { FavouriteContext, URL } from "../../../context";
import { Box, Text } from "../../components";
import { AntDesign } from "@expo/vector-icons";

interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { favourites, addToFavourite, removeFromFavourite } =
    useContext(FavouriteContext);

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

  const isFavourite = favourites
    ? favourites.data.find((f: any) => f.product.id === product.id)
    : false;
    
  const onAddFav = async () => {
    await addToFavourite(product.id);
  };

  const onRemoveFav = async () => {
    await removeFromFavourite(isFavourite.id);
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
        <Box position="absolute" top={10} right={10}>
          <TouchableOpacity
            onPress={() => (isFavourite ? onRemoveFav() : onAddFav())}
          >
            <AntDesign
              name={isFavourite ? "heart" : "hearto"}
              size={24}
              color={isFavourite ? "#FF4500" : "black"}
            />
          </TouchableOpacity>
        </Box>
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
