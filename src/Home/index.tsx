import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeRoutes } from "../components/Navigation";
import { DrawerContent, DRAWER_WIDTH } from "./Drawer";
export { assets } from "./Drawer"

import OutfitIdeas from "./OutfitIdeas";
import FavouriteOutfits from "./FavouriteOutfits";
import TransactionHistory from "./TransactionHistory";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: DRAWER_WIDTH },
      }}
    >
      <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} />
      <Drawer.Screen name="FavouriteOutfits" component={FavouriteOutfits} />
      <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
    </Drawer.Navigator>
  );
};
