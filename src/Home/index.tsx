import React, { useContext, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AppRoutes, HomeRoutes } from "../components/Navigation";
import { DrawerContent, DRAWER_WIDTH } from "./Drawer";
export { assets } from "./Drawer";

import OutfitIdeas from "./OutfitIdeas";
import FavouriteOutfits from "./FavouriteOutfits";
import TransactionHistory from "./TransactionHistory";
import EditProfile from "./EditProfile";
import NotificationsSettings from "./NotificationsSettings";
import Cart from "./Cart";
import AuthContext from "../../context";
import { CommonActions } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { ProductNavigator } from "./ProductNavigator";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = ({
  navigation,
}: StackScreenProps<AppRoutes, "Home">) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Authentication" }],
        })
      );
    }
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: DRAWER_WIDTH },
      }}
      initialRouteName="ProductNavigator"
    >
      <Drawer.Screen name="ProductNavigator" component={ProductNavigator} />
      <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} />
      <Drawer.Screen name="FavouriteOutfits" component={FavouriteOutfits} />
      <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen
        name="NotificationsSettings"
        component={NotificationsSettings}
      />
      <Drawer.Screen name="Cart" component={Cart} />
    </Drawer.Navigator>
  );
};
