import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { RoundedIcon } from "../../components";
import { HomeRoutes } from "../../components/Navigation";
import { Theme, Box, Text } from "../../components/Theme";

export interface DrawerItemProps {
  icon: any;
  label: string;
  screen: keyof HomeRoutes;
  color: keyof Theme["colors"];
}

const DrawerItem = ({ icon, label, screen, color }: DrawerItemProps) => {
  const navigation =
    useNavigation<DrawerNavigationProp<HomeRoutes, "OutfitIdeas">>();
  return (
    <RectButton onPress={() => navigation.navigate(screen)}>
      <Box flexDirection="row" alignItems="center" padding="m">
        <RoundedIcon
          name={icon}
          size={36}
          iconRatio={0.5}
          backgroundColor={color}
          color={"white"}
        />
        <Text variant="button" color="secondary" marginLeft="m">
          {label}
        </Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
