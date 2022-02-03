import { DrawerScreenProps } from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import { HomeRoutes } from "../../components/Navigation";

const OutfitIdeas = ({}: DrawerScreenProps<HomeRoutes, "OutfitIdeas">) => {
  return <View style={{ flex: 1, backgroundColor: "red" }} />;
};

export default OutfitIdeas;
