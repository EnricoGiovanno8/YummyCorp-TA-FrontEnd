import React, { useContext } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FavouriteContext } from "../../../context";

import { Box, Header, Text, useTheme } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import ProductCard from "../ProductNavigator/ProductCard";

const { width: wWidth } = Dimensions.get("window");

const FavouriteOutfits = ({
  navigation,
}: HomeNavigationProps<"FavouriteOutfits">) => {
  const { favourites, getNextFavourites } = useContext(FavouriteContext);

  const theme = useTheme();
  // @ts-ignore: Object is possibly 'undefined'.
  const width = (wWidth - theme.spacing.m * 3) / 2;

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };
  // 1841.4285888671875
  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Favourite Outfits"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "heart", onPress: () => navigation.navigate("Cart") }}
      />
      <Box flex={1} padding="m">
        {favourites && favourites.data.length !== 0 ? (
          <Box flex={1}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={async ({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                  await getNextFavourites(favourites.meta.page + 1);
                }
              }}
            >
              <Box flexDirection="row">
                <Box flex={1} paddingRight="s">
                  {favourites.data
                    .filter((_: any, i: any) => i % 2 === 0)
                    .map((favourite: any) => (
                      <TouchableOpacity
                        key={favourite.id}
                        onPress={() =>
                          navigation.navigate("ProductNavigator", {
                            screen: 'ProductDetail',
                            params: { product: favourite.product, from: "FavouriteOutfits" },
                          })
                        }
                      >
                        <ProductCard product={favourite.product} />
                      </TouchableOpacity>
                    ))}
                </Box>
                <Box flex={1} paddingLeft="s">
                  {favourites.data
                    .filter((_: any, i: any) => i % 2 !== 0)
                    .map((favourite: any) => (
                      <TouchableOpacity
                        key={favourite.id}
                        onPress={() =>
                          navigation.navigate("ProductNavigator", {
                            screen: "ProductDetail",
                            params: { product: favourite.product, from: "FavouriteOutfits" },
                          })
                        }
                      >
                        <ProductCard product={favourite.product} />
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
    </Box>
  );
};

export default FavouriteOutfits;
