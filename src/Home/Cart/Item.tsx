import React, { useState } from "react";
import { Image, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { URL } from "../../../context";
import { Box, RoundedIconButton, Text, useTheme } from "../../components";
import { Feather as Icon } from "@expo/vector-icons";

interface ItemProps {
  onDelete: () => void;
  cartItem: any;
}

const Item = ({ onDelete, cartItem }: ItemProps) => {
  const [selectedQuantity, setSelectedQuantity] = useState(cartItem.quantity);
  const theme = useTheme();
  // @ts-ignore
  const height = 120 + theme.spacing.m * 2;

  const onMinus = () => {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1)
    }
  };

  const onPlus = () => {
    if (selectedQuantity < cartItem.productStock.stock) {
      setSelectedQuantity(selectedQuantity + 1)
    }
  };

  const onChange = (text: string) => {
    if (+text <= 0) {
      setSelectedQuantity(0)
    } else if (+text >= cartItem.productStock.stock) {
      setSelectedQuantity(cartItem.productStock.stock)
    } else (
      setSelectedQuantity(+text)
    )
  }

  return (
    <Box height={height}>
      <Box padding="m" flexDirection="row">
        <Box
          width={120}
          height={120}
          // @ts-ignore
          borderRadius="m"
          style={{
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: `${URL}/product-image/${cartItem.product.image}` }}
            style={{
              ...StyleSheet.absoluteFillObject,
              resizeMode: "cover",
            }}
          />
        </Box>
        <Box paddingHorizontal="s" flex={1} justifyContent="center">
          <Text variant="header" style={{ fontSize: 12 }}>
            Size {cartItem.size.name}
          </Text>
          <Text variant="title3" marginBottom="s" style={{ fontSize: 13 }}>
            {cartItem.product.name}
          </Text>
          <Text variant="title3" style={{ fontSize: 13 }} color="primary">
            Rp{" "}
            {cartItem.productStock.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </Text>
        </Box>
        <Box justifyContent="center">
          <Box flexDirection="row" justifyContent="center" marginBottom="s">
            <RoundedIconButton
              name="minus"
              size={30}
              onPress={() => onMinus()}
              backgroundColor="danger"
              color="white"
              disabled={selectedQuantity <=0  ? true : false}
            />
            <TextInput
              textAlign="center"
              value={selectedQuantity.toString()}
              style={{
                backgroundColor: theme.colors.greyButton,
                // @ts-ignore
                borderRadius: theme.borderRadii.l,
                color: theme.colors.secondary,
                width: 40,
                height: 30,
                marginHorizontal: 1,
              }}
              onChangeText={(text) => onChange(text)}
            />
            <RoundedIconButton
              name="plus"
              size={30}
              onPress={() => onPlus()}
              backgroundColor="green"
              color="white"
              disabled={selectedQuantity >= cartItem.productStock.stock ? true : false}
            />
          </Box>
          <TouchableOpacity onPress={() => onDelete()}>
            <Box
              alignItems="center"
              // @ts-ignore
              borderRadius="m"
              style={{
                padding: 3,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.1)",
              }}
            >
              <Icon name="trash-2" size={20} />
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default Item;
