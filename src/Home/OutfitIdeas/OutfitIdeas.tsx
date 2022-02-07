import React, { useState } from "react";
import { Box, Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Background from "./Background";
import Card from "./Card";
import Categories from "./Categories";

const cards = [
  {
    index: 3,
    source: require("../../Authentication/assets/4.png"),
  },
  {
    index: 2,
    source: require("../../Authentication/assets/3.png"),
  },
  {
    index: 1,
    source: require("../../Authentication/assets/2.png"),
  },
  {
    index: 0,
    source: require("../../Authentication/assets/1.png"),
  },
];

const OutfitIdeas = ({ navigation }: HomeNavigationProps<"OutfitIdeas">) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="Outfit Ideas"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "shopping-bag", onPress: () => true }}
      />
      <Box flex={1}>
        <Background />
        <Categories />
        {cards.map(
          ({ index, source }) =>
            index >= currentIndex && (
              <Card
                key={index}
                onSwipe={() => setCurrentIndex((prev) => prev + 1)}
                {...{ source }}
              />
            )
        )}
      </Box>
    </Box>
  );
};

export default OutfitIdeas;
