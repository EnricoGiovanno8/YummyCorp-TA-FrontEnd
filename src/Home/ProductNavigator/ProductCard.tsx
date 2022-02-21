import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { URL } from "../../../context";
import { Box, Text } from "../../components";

const ProductCard = () => {
  return (
    <TouchableOpacity onPress={() => console.log('jalan')}>
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
        <Box height={200} backgroundColor="lightBlue">
          <Image
            source={{ uri: `${URL}/default-image.png` }}
            style={{
              resizeMode: "stretch",
              height: "100%",
            }}
          />
        </Box>
        <Box padding="s">
          <Text variant="productName" marginBottom="s">
            Sepatu
          </Text>
          <Text variant="productStartsFrom">Starts from</Text>
          <Text variant="productPrice">Rp 1.000.000</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default ProductCard;
