import Constants from "expo-constants";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ScrollView,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { CartContext, URL } from "../../../context";
import {
  Box,
  Button,
  Header,
  palette,
  RoundedIcon,
  RoundedIconButton,
  Text,
  useTheme,
} from "../../components";
import { ProductNavigationProps } from "../../components/Navigation";
const { height: wHeight } = Dimensions.get("window");
const { height: sHeight, width: sWidth } = Dimensions.get("screen");

const ProductDetail = ({
  navigation,
  route,
}: ProductNavigationProps<"ProductDetail">) => {
  const { addToCart } = useContext(CartContext);
  const [sizes, setSizes] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [productStockId, setProductStockId] = useState<any>(null);
  const [sizeId, setSizeId] = useState<any>(null);
  const [quantity, setQuantity] = useState(0);

  const theme = useTheme();
  const styles = StyleSheet.create({
    blackFilterDrawer: {
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "absolute",
      height: sHeight,
      width: sWidth,
      bottom: -sHeight,
    },
    model: {
      position: "absolute",
      backgroundColor: palette.white,
      width: 380,
      height: 250,
      bottom: -0.5 * sHeight - 125,
      left: 0.5 * sWidth - 190,
      // @ts-ignore
      borderRadius: theme.borderRadii.l,
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
  });
  const blackFilterDrawerPosition = useSharedValue(0);
  const modelPosition = useSharedValue(0);
  const animatedBlackFilterDrawer = useAnimatedStyle(() => ({
    transform: [{ translateY: blackFilterDrawerPosition.value }],
  }));
  const animatedModel = useAnimatedStyle(() => ({
    transform: [{ translateY: modelPosition.value }],
  }));
  const onTapEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: () => {
      blackFilterDrawerPosition.value = withTiming(0, {
        duration: 500,
      });
      modelPosition.value = withTiming(0, {
        duration: 500,
      });
    },
  });

  const { product } = route.params;

  const sortSizes = () => {
    const sizesNan: any = [];
    const tempSizes = product.productStocks.map(
      (stock: any) => stock.size.name
    );
    const isNan = isNaN(parseInt(tempSizes[0]));

    if (!isNan) {
      tempSizes.sort((a: number, b: number) => a - b);
      setSizes(tempSizes);
    } else {
      if (tempSizes.includes("XXXS")) {
        sizesNan.push("XXXS");
      }
      if (tempSizes.includes("XXS")) {
        sizesNan.push("XXS");
      }
      if (tempSizes.includes("XS")) {
        sizesNan.push("XS");
      }
      if (tempSizes.includes("S")) {
        sizesNan.push("S");
      }
      if (tempSizes.includes("M")) {
        sizesNan.push("M");
      }
      if (tempSizes.includes("L")) {
        sizesNan.push("L");
      }
      if (tempSizes.includes("XL")) {
        sizesNan.push("XL");
      }
      if (tempSizes.includes("XXL")) {
        sizesNan.push("XXL");
      }
      if (tempSizes.includes("XXXL")) {
        sizesNan.push("XXXL");
      }
      setSizes(sizesNan);
    }
  };

  useEffect(() => {
    sortSizes();
    if (!product) {
      navigation.navigate("Product");
    }
  }, []);

  const onSelectSize = (size: any) => {
    const productStock = product.productStocks.filter(
      (pS: any) => pS.size.name === size
    );
    setSelectedSize(size);
    setQuantity(0);
    setSelectedStock(productStock[0].stock);
    setProductStockId(productStock[0].id);
    setSizeId(productStock[0].size.id);
    setSelectedPrice(
      productStock[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
  };

  const onMinusQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const onPlusQuantity = () => {
    if (selectedStock) {
      if (quantity < selectedStock) {
        setQuantity(quantity + 1);
      }
    }
  };

  const onChangeQuantity = (text: string) => {
    if (selectedStock) {
      if (+text <= 0) {
        setQuantity(0);
      } else if (+text >= selectedStock) {
        setQuantity(selectedStock);
      } else {
        setQuantity(+text);
      }
    }
  };

  const onAddToCart = async () => {
    if (quantity !== 0 && selectedPrice) {
      const data = {
        productId: product.id,
        productStockId,
        sizeId,
        quantity,
      };

      const success = await addToCart(data);
      if (success === "SUCCESS") {
        blackFilterDrawerPosition.value = withTiming(-sHeight, {
          duration: 500,
        });
        modelPosition.value = withTiming(
          -0.5 * sHeight - 125 - (0.5 * sHeight - 125),
          {
            duration: 500,
          }
        );
      }
    }
  };

  const onKeepShopping = () => {
    blackFilterDrawerPosition.value = withTiming(0, {
      duration: 500,
    });
    modelPosition.value = withTiming(0, {
      duration: 500,
    });
  };

  return (
    <KeyboardAwareScrollView>
      <Box
        height={
          wHeight + (Platform.OS === "android" ? Constants.statusBarHeight : 0)
        }
        backgroundColor="background"
      >
        <Header
          title=""
          left={{ icon: "arrow-left", onPress: () => navigation.goBack() }}
        />
        <Box flex={1} marginHorizontal="l">
          <Box
            width="100%"
            height="40%"
            alignSelf="center"
            marginTop="s"
            borderWidth={5}
            // @ts-ignore
            borderRadius="l"
            overflow="hidden"
            style={{
              borderColor: "rgba(0,0,0,0.1)",
            }}
          >
            <Image
              source={{ uri: `${URL}/product-image/${product.image}` }}
              style={{
                ...StyleSheet.absoluteFillObject,
                resizeMode: "cover",
              }}
            />
          </Box>
          <Box marginTop="m">
            <Text variant="title4">{product.name}</Text>
            <Text variant="productPriceTitle" marginBottom="s">
              Brand: {product.brand}
            </Text>
            <Box
              backgroundColor={product.gender === "Men" ? "men" : "women"}
              style={{
                padding: 5,
                borderRadius: 5,
                width: product.gender === "Men" ? 46.6 : 74,
              }}
              marginVertical="s"
            >
              <Text variant="productPriceTitle" color="background">
                {product.gender}
              </Text>
            </Box>
            <Text variant="productPriceTitle" marginVertical="s">
              Select Size:
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Box flexDirection="row" flexWrap="wrap" marginTop="s">
                {sizes.length > 0
                  ? sizes.map((size) => {
                      const backgroundColor =
                        selectedSize === size
                          ? theme.colors.primary
                          : theme.colors.background2;
                      return (
                        <TouchableOpacity
                          key={size}
                          onPress={() => onSelectSize(size)}
                        >
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 25,
                              backgroundColor,
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: 16,
                              marginRight: 8,
                            }}
                          >
                            <Text
                              textAlign="center"
                              variant="header"
                              color={
                                selectedSize === size
                                  ? "textContrast"
                                  : "secondary"
                              }
                            >
                              {isNaN(size) ? size.toUpperCase() : size}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })
                  : null}
              </Box>
            </ScrollView>
            {selectedSize ? (
              <Box>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Text variant="productPriceTitle" marginBottom="s">
                      Set Quantity (stock: {selectedStock})
                    </Text>
                    <Box
                      flexDirection="row"
                      alignItems="center"
                      marginVertical="s"
                    >
                      <RoundedIconButton
                        name="minus"
                        size={30}
                        onPress={() => onMinusQuantity()}
                        backgroundColor="danger"
                        color="white"
                        disabled={quantity <= 0 ? true : false}
                        opacity={quantity <= 0 ? 0.3 : 1}
                      />
                      <TextInput
                        textAlign="center"
                        value={quantity.toString()}
                        style={{
                          backgroundColor: theme.colors.greyButton,
                          // @ts-ignore
                          borderRadius: theme.borderRadii.l,
                          color: theme.colors.secondary,
                          width: 60,
                          height: 30,
                          marginHorizontal: theme.spacing.l,
                        }}
                        onChangeText={(text) => onChangeQuantity(text)}
                      />
                      <RoundedIconButton
                        name="plus"
                        size={30}
                        onPress={() => onPlusQuantity()}
                        backgroundColor="green"
                        color="white"
                        disabled={quantity >= selectedStock ? true : false}
                        opacity={quantity >= selectedStock ? 0.3 : 1}
                      />
                    </Box>
                  </Box>
                  <Box alignSelf="flex-end" paddingBottom="s">
                    <Text variant="productPriceTitle2" color="text">
                      Rp {selectedPrice}
                    </Text>
                  </Box>
                </Box>
                <Box alignSelf="center" marginTop="m">
                  <Button
                    variant="primary"
                    onPress={() => onAddToCart()}
                    label={"Add to Cart"}
                    disabled={quantity === 0 ? true : null}
                    opacity={quantity === 0 ? 0.3 : 1}
                  />
                </Box>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
      <TapGestureHandler onGestureEvent={onTapEvent}>
        <Animated.View
          style={[styles.blackFilterDrawer, animatedBlackFilterDrawer]}
        />
      </TapGestureHandler>
      <Animated.View style={[styles.model, animatedModel]}>
        <Box
          flex={1}
          margin="l"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <RoundedIcon
            name="check"
            size={60}
            backgroundColor="primaryLight"
            color="primary"
          />
          <Text variant="title1" color="primary">
            Added to Cart
          </Text>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            <Button
              label="Keep Shopping"
              onPress={() => onKeepShopping()}
              style={{
                width: "47.5%",
                backgroundColor: theme.colors.primaryLight,
              }}
            />
            <Button
              label="Go to Cart"
              variant="primary"
              style={{ width: "47.5%" }}
              onPress={() => navigation.navigate("Cart")}
            />
          </Box>
        </Box>
      </Animated.View>
    </KeyboardAwareScrollView>
  );
};

export default ProductDetail;
