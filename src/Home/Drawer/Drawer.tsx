import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Box, RoundedIconButton, Text } from "../../components";
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
    label: "Favourites Outfits",
    screen: "FavouritesOutfits",
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
    screen: "Logout",
    color: "secondary",
  },
];

interface DrawerProps {}

const DrawerContent = () => {
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
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="m"
        >
            <RoundedIconButton
              size={24}
              name="x"
              color="white"
              backgroundColor="secondary"
              onPress={() => true}
            />
            <Text color="white">MY PROFILE</Text>
            <RoundedIconButton
              size={24}
              name="shopping-bag"
              color="white"
              backgroundColor="secondary"
              onPress={() => true}
            />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box flex={1} backgroundColor="primaryLight" />
        <Image
          source={require("../../components/assets/patterns/3.png")}
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
            <DrawerItem key={item.screen} {...item} />
          ))}
        </Box>
      </Box>
      <Box
        backgroundColor="white"
        {...{ width: DRAWER_WIDTH, height: height * 0.5, overflow: "hidden" }}
      >
        <Image
          source={require("../../components/assets/patterns/3.png")}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
          }}
        />
      </Box>
    </Box>
  );
};

export default DrawerContent;