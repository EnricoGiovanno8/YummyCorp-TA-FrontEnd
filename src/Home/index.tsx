import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeRoutes } from "../components/Navigation";
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

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    console.log("TIDAK ADA USER HARUS KE AUTHENTICATION")
    // return navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: "Authentication" }],
    //   })
    // );
  }
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
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen
        name="NotificationsSettings"
        component={NotificationsSettings}
      />
      <Drawer.Screen name="Cart" component={Cart} />
    </Drawer.Navigator>
  );
};
