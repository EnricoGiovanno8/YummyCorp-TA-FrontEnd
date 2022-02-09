import React, { useRef, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";

import { Box, Header, useTheme } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";

import Footer from "./Footer";
import Outfit from "./Outfit";
import TopCurve from "./TopCurve";

const { width: wWidth } = Dimensions.get("window");

const defaultOutfits = [
  {
    id: 1,
    color: "#BFEAF5",
    aspectRatio: 1,
  },
  {
    id: 2,
    color: "#BEECC4",
    aspectRatio: 200 / 145,
  },
  {
    id: 3,
    color: "#FFE4D9",
    aspectRatio: 180 / 145,
  },
  {
    id: 4,
    color: "#FFDDDD",
    aspectRatio: 180 / 145,
  },
  {
    id: 5,
    color: "#BFEAF5",
    aspectRatio: 1,
  },
  {
    id: 6,
    color: "#F3F0Ef",
    aspectRatio: 120 / 145,
  },
  {
    id: 7,
    color: "#D5C3BB",
    aspectRatio: 210 / 145,
  },
  {
    id: 8,
    color: "#DEEFC4",
    aspectRatio: 160 / 145,
  },
];

const FavouriteOutfits = ({
  navigation,
}: HomeNavigationProps<"FavouriteOutfits">) => {
  const transition = (
    <Transition.Together>
      <Transition.Out type="fade"/>
      <Transition.In type="fade"/>
    </Transition.Together>
  );
  const list = useRef<TransitioningView>(null);

  const [outfits, setOutfits] = useState(defaultOutfits);
  const [selectedOutfits, setSelectedOutfits] = useState<typeof defaultOutfits>(
    []
  );

  const theme = useTheme();
  // @ts-ignore: Object is possibly 'undefined'.
  const width = (wWidth - theme.spacing.m * 3) / 2;
  const [footerHeight, setFooterHeight] = useState(0);

  const onSelectOutfit = (outfit: {
    id: number;
    color: string;
    aspectRatio: number;
  }) => {
    const exist = selectedOutfits.filter((sO) => sO.id === outfit.id);

    if (exist.length > 0) {
      const newArray = selectedOutfits.filter((o) => o.id !== outfit.id);
      setSelectedOutfits(newArray);
    } else {
      setSelectedOutfits([...selectedOutfits, outfit]);
    }
  };

  const addMoreToFavorite = () => {
    list.current?.animateNextTransition();
    const newOutfits = outfits.filter((outfit) => {
      return !selectedOutfits.find((selectedOutfit) => {
        return outfit.id === selectedOutfit.id;
      });
    });

    setOutfits(newOutfits);
  };
  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Favourite Outfits"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "shopping-bag", onPress: () => true }}
      />
      <Box flex={1}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.m,
            paddingBottom: footerHeight,
          }}
        >
          <Transitioning.View ref={list} transition={transition}>
            <Box flexDirection="row">
              <Box marginRight="m">
                {outfits
                  .filter((_, i) => i % 2 !== 0)
                  .map((outfit) => (
                    <Outfit
                      key={outfit.id}
                      outfit={outfit}
                      width={width}
                      onSelectOutfit={(outfit: {
                        id: number;
                        color: string;
                        aspectRatio: number;
                      }) => onSelectOutfit(outfit)}
                    />
                  ))}
              </Box>
              <Box>
                {outfits
                  .filter((_, i) => i % 2 === 0)
                  .map((outfit) => (
                    <Outfit
                      key={outfit.id}
                      outfit={outfit}
                      width={width}
                      onSelectOutfit={(outfit: {
                        id: number;
                        color: string;
                        aspectRatio: number;
                      }) => onSelectOutfit(outfit)}
                    />
                  ))}
              </Box>
            </Box>
          </Transitioning.View>
        </ScrollView>
        <TopCurve footerHeight={footerHeight} />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => setFooterHeight(height)}
        >
          <Footer label="Add more to favourite" onPress={addMoreToFavorite} />
        </Box>
      </Box>
    </Box>
  );
};

export default FavouriteOutfits;
