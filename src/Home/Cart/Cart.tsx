import React, { useContext, useEffect } from "react";
import { Dimensions, Image, ScrollView, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { CartContext } from "../../../context";
import { Box, Header, aspectRatio, useTheme, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import CartContainer from "./CartContainer";
import Checkout from "./Checkout";
import Item from "./Item";

const height = 100 * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 Z";

const { height: wHeight } = Dimensions.get("window");

const Cart = ({ navigation }: HomeNavigationProps<"Cart">) => {
  const { cart, getUserCart, deleteCartItem } = useContext(CartContext);

  useEffect(() => {
    (async () =>
      navigation.addListener("focus", async () => {
        await getUserCart();
      }))();
  }, []);

  const onDelete = (id: number) => {
    deleteCartItem({ id });
  };

  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ height: wHeight + insets.top }}
    >
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
          {cart.length === 0 ? (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Box width={100} height={100} marginBottom="l">
                <Image
                  source={require("../../../assets/empty-cart.png")}
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    width: undefined,
                    height: undefined,
                  }}
                />
              </Box>
              <Text variant="title3" color="primary">
                YOUR CART IS EMPTY
              </Text>
            </Box>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingTop: 50 * aspectRatio,
                paddingBottom: theme.spacing.l,
              }}
            >
              {cart.map((cartItem, index) => (
                <Item
                  key={index}
                  cartItem={cartItem}
                  onDelete={() => onDelete(cartItem.id)}
                />
              ))}
            </ScrollView>
          )}
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
            {cart.length === 0 ? null : (
              <Text variant="title2" textAlign="center" color="background">
                {cart.length} Items Added
              </Text>
            )}
          </Box>
        </Box>
      </CartContainer>
    </KeyboardAwareScrollView>
  );
};

export default Cart;
