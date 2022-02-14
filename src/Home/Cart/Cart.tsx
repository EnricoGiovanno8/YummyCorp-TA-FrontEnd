import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Box, Header, aspectRatio, useTheme, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import CartContainer from "./CartContainer";
import Checkout from "./Checkout";
import Item from "./Item";

const height = 100 * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 Z";
const defaultItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const Cart = ({ navigation }: HomeNavigationProps<"Cart">) => {
  const [items, setItems] = useState(defaultItems);
  const theme = useTheme();
  return (
    <CartContainer CheckoutComponent={Checkout}>
      <Box>
        <Box backgroundColor="primary">
          <Header
            title="Shopping Cart"
            left={{ icon: "arrow-left", onPress: () => navigation.goBack() }}
            isShoppingCart
          />
        </Box>
      </Box>
      <Box flex={1}>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 50 * aspectRatio }}
        >
          {items.map((item, index) => (
            <Item
              key={item.id}
              onDelete={() => {
                items.splice(index, 1);
                setItems(items.concat());
              }}
            />
          ))}
        </ScrollView>
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
          }}
        >
          <Svg style={StyleSheet.absoluteFill} viewBox="0 0 375 100">
            <Path d={d} fill={theme.colors.primary} />
          </Svg>
          <Text variant="title2" textAlign="center" color="background">
            3 Items Added
          </Text>
        </Box>
      </Box>
    </CartContainer>
  );
};

export default Cart;