import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  NativeScrollEvent,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  aspectRatio,
  Box,
  Header,
  palette,
  Text,
  useTheme,
  Button,
} from "../../components";
import { ProductNavigationProps } from "../../components/Navigation";
import { Feather as Icon } from "@expo/vector-icons";
import { clamp } from "react-native-redash";
import ProductCard from "./ProductCard";
import { ProductContext } from "../../../context";

const Product = ({ navigation }: ProductNavigationProps<"Product">) => {
  const { products, getProducts, getNextProducts } = useContext(ProductContext);
  const [searchKeywordDummy, setSearchKeywordDummy] = useState("");
  const [searchKeywordReal, setSearchKeywordReal] = useState("");

  const [selectedMen, setSelectedMen] = useState(false);
  const [selectedWomen, setSelectedWomen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    navigation.addListener("focus", async () => {
      setSelectedMen(false);
      setSelectedWomen(false);
      setSelectedGender("");
      await getProducts(searchKeywordDummy, 1, selectedGender);
    });
  }, []);

  const selectGender = () => {
    if (selectedMen && selectedWomen) {
      setSelectedGender("");
    } else if (selectedMen) {
      setSelectedGender("Men");
    } else if (selectedWomen) {
      setSelectedGender("Women");
    } else {
      setSelectedGender("");
    }
  };

  const { width: sWidth, height: sHeight } = Dimensions.get("screen");
  const theme = useTheme();

  const styles = StyleSheet.create({
    blackFilterDrawer: {
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "absolute",
      height: sHeight,
      width: sWidth,
      bottom: -sHeight,
      // bottom: 0,
    },
    filterDrawer: {
      backgroundColor: palette.white,
      position: "absolute",
      bottom: -0.81 * sHeight,
      // bottom: 0,
      width: sWidth,
      height: 0.81 * sHeight,
      // @ts-ignore
      borderTopLeftRadius: theme.borderRadii.ll,
      // @ts-ignore
      borderTopRightRadius: theme.borderRadii.ll,
      elevation: 5,
      shadowColor: "black",
      shadowOpacity: 1,
    },
    filterDrawerCursor: {
      height: 5 * aspectRatio,
      backgroundColor: theme.colors.info,
      width: 60 * aspectRatio,
      borderRadius: 2.5 * aspectRatio,
    },
  });

  const filterDrawerPosition = useSharedValue(0);
  const blackFilterDrawerPosition = useSharedValue(0);

  const animatedFilterDrawer = useAnimatedStyle(() => ({
    transform: [{ translateY: filterDrawerPosition.value }],
  }));
  const animatedBlackFilterDrawer = useAnimatedStyle(() => ({
    transform: [{ translateY: blackFilterDrawerPosition.value }],
  }));

  const callOutDrawer = () => {
    Keyboard.dismiss();
    filterDrawerPosition.value = withTiming(-0.81 * sHeight, {
      duration: 500,
    });
    blackFilterDrawerPosition.value = withTiming(-sHeight, {
      duration: 500,
    });
  };

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number }
  >({
    onStart: (_, ctx) => {
      ctx.y = filterDrawerPosition.value;
    },
    onActive: ({ translationY }, ctx) => {
      filterDrawerPosition.value = clamp(
        ctx.y + translationY,
        -0.81 * sHeight,
        0
      );
      blackFilterDrawerPosition.value = clamp(
        ctx.y + translationY - 0.19 * sHeight,
        -sHeight,
        0
      );
    },
    onEnd: () => {
      if (filterDrawerPosition.value >= -650) {
        filterDrawerPosition.value = withTiming(0, {
          duration: 500,
        });
        blackFilterDrawerPosition.value = withTiming(0, {
          duration: 500,
        });
      } else {
        filterDrawerPosition.value = -0.81 * sHeight;
        blackFilterDrawerPosition.value = -sHeight;
      }
    },
  });
  const onTapEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: () => {
      filterDrawerPosition.value = withTiming(0, {
        duration: 500,
      });
      blackFilterDrawerPosition.value = withTiming(0, {
        duration: 500,
      });
    },
  });

  const nextPage = () => {
    if (products.meta.page === products.meta.lastPage) {
    } else {
      getNextProducts(
        searchKeywordReal,
        products.meta.page + 1,
        selectedGender
      );
    }
  };

  const applyFilter = async () => {
    filterDrawerPosition.value = withTiming(0, {
      duration: 500,
    });
    blackFilterDrawerPosition.value = withTiming(0, {
      duration: 500,
    });
    let sGender;
    if (selectedMen && selectedWomen) {
      sGender = "";
    } else if (selectedMen) {
      sGender = "Men";
    } else if (selectedWomen) {
      sGender = "Women";
    } else {
      sGender = "";
    }
    await getProducts(searchKeywordDummy, 1, sGender);
    selectGender();
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  return (
    <Box
      flex={1}
      backgroundColor="background"
      onTouchStart={() => Keyboard.dismiss()}
    >
      <Header
        title="Home"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "heart", onPress: () => navigation.navigate("Cart") }}
      />
      <Box flex={1} paddingHorizontal="m" paddingTop="s">
        <Box>
          <Searchbar
            value={searchKeywordDummy}
            onChangeText={(text) => setSearchKeywordDummy(text)}
            onSubmitEditing={async () => {
              setSearchKeywordReal(searchKeywordDummy);
              getProducts(searchKeywordDummy, 1, selectedGender);
            }}
            autoComplete={false}
          />
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Box>
            <TouchableOpacity
              style={{ width: 103, marginVertical: 16 }}
              onPress={() => callOutDrawer()}
            >
              <Box
                paddingVertical="s"
                paddingHorizontal="m"
                // @ts-ignore
                borderRadius="l"
                borderWidth={1}
                alignSelf="flex-start"
                flexDirection="row"
                alignItems="center"
              >
                <Text variant="filter" marginRight="s">
                  Filter
                </Text>
                <Icon name="filter" size={16} />
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
        {products && products.data.length !== 0 ? (
          <Box flex={1}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                  nextPage();
                }
              }}
            >
              <Box flexDirection="row">
                <Box flex={1} paddingRight="s">
                  {products.data
                    .filter((_: any, i: any) => i % 2 === 0)
                    .map((product: any) => (
                      <TouchableOpacity
                        key={product.id}
                        onPress={() =>
                          navigation.navigate("ProductDetail", { product })
                        }
                      >
                        <ProductCard product={product} />
                      </TouchableOpacity>
                    ))}
                </Box>
                <Box flex={1} paddingLeft="s">
                  {products.data
                    .filter((_: any, i: any) => i % 2 !== 0)
                    .map((product: any) => (
                      <TouchableOpacity
                        key={product.id}
                        onPress={() =>
                          navigation.navigate("ProductDetail", { product })
                        }
                      >
                        <ProductCard product={product} />
                      </TouchableOpacity>
                    ))}
                </Box>
              </Box>
            </ScrollView>
          </Box>
        ) : (
          <Box>
            <Text>No Product Found</Text>
          </Box>
        )}
      </Box>
      <TapGestureHandler onGestureEvent={onTapEvent}>
        <Animated.View
          style={[styles.blackFilterDrawer, animatedBlackFilterDrawer]}
        />
      </TapGestureHandler>
      <Animated.View style={[styles.filterDrawer, animatedFilterDrawer]}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.filterDrawerCursor} />
          </Animated.View>
        </PanGestureHandler>
        <Box padding="m">
          <Box alignSelf="center" marginBottom="m">
            <Button
              variant="primary"
              onPress={() => applyFilter()}
              label={"Apply Filter"}
            />
          </Box>
          <Text variant="body">What type of outfit are you looking for?</Text>
          <Box flexDirection="row" flexWrap="wrap" marginVertical="s">
            <Button
              variant={selectedMen ? "primary" : "default"}
              onPress={() => setSelectedMen(!selectedMen)}
              label={"Men"}
              style={{
                width: "auto",
                height: "auto",
                padding: 16,
                marginRight: 8,
              }}
            />
            <Button
              variant={selectedWomen ? "primary" : "default"}
              onPress={() => setSelectedWomen(!selectedWomen)}
              label={"Women"}
              style={{
                width: "auto",
                height: "auto",
                padding: 16,
                marginRight: 8,
              }}
            />
          </Box>
        </Box>
      </Animated.View>
    </Box>
  );
};

export default Product;
