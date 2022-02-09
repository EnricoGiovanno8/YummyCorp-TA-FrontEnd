import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { CommonActions } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Box, Header, Text } from "../../components";
import DrawerItem, { DrawerItemProps } from "./DrawerItem";

const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;

const items: DrawerItemProps[] = [
  {
    icon: "zap",
    label: "Outfit Ideas",
    screen: "OutfitIdeas",
    color: "primary",
  },
  {
    icon: "heart",
    label: "Favourite Outfits",
    screen: "FavouriteOutfits",
    color: "orange",
  },
  {
    icon: "user",
    label: "Edit Profile",
    screen: "EditProfile",
    color: "yellow",
  },
  {
    icon: "clock",
    label: "Transaction History",
    screen: "TransactionHistory",
    color: "pink",
  },
  {
    icon: "settings",
    label: "Notifications Settings",
    screen: "NotificationsSettings",
    color: "violet",
  },
  {
    icon: "log-out",
    label: "Logout",
    onPress: (navigation) =>
    // @ts-ignore
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Authentication" }],
        })
      ),
    color: "secondary",
  },
];

export const assets = [require("./assets/drawer.jpg")];

// interface DrawerProps {}

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="white">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          // @ts-ignore: Object is possibly 'undefined'.
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        >
          <Header
            title="My Profile"
            left={{ icon: "x", onPress: () => navigation.closeDrawer() }}
            right={{ icon: "shopping-bag", onPress: () => true }}
            dark
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box flex={1} backgroundColor="primaryLight" />
        <Image
          source={assets[0]}
          style={{
            position: "absolute",
            bottom: -height * 0.61,
            left: 0,
            right: 0,
            width: DRAWER_WIDTH,
            height: height,
          }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="white"
          // @ts-ignore: Object is possibly 'undefined'.
          borderTopLeftRadius="xl"
          // @ts-ignore: Object is possibly 'undefined'.
          borderBottomRightRadius="xl"
          justifyContent="center"
          paddingHorizontal="xl"
        >
          <Box
            alignSelf="center"
            backgroundColor="primary"
            width={100}
            height={100}
            style={{ borderRadius: 50, top: -80 }}
          />
          <Box marginBottom="m" style={{ marginTop: -60 }}>
            <Text variant="title1" textAlign="center">
              Mike Peter
            </Text>
            <Text variant="body" textAlign="center">
              mike@flexinstudio.com
            </Text>
          </Box>
          {items.map((item) => (
            <DrawerItem key={item.label} {...item} />
          ))}
        </Box>
      </Box>
      <Box
        backgroundColor="white"
        {...{ width: DRAWER_WIDTH, height: height * 0.5, overflow: "hidden" }}
      >
        <Image
          source={assets[0]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
            borderTopLeftRadius: 75,
          }}
        />
      </Box>
    </Box>
  );
};

export default DrawerContent;
