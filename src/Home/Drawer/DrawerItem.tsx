import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { RectButton } from "react-native-gesture-handler";
import { RoundedIcon } from "../../components";
import { HomeRoutes } from "../../components/Navigation";
import { Theme, Box, Text } from "../../components/Theme";
import AuthContext from "../../../context";

interface BaseDrawerItem {
  icon: string;
  color: keyof Theme["colors"];
  label: string;
}

interface ScreenDrawerItem extends BaseDrawerItem {
  screen: keyof HomeRoutes;
}

interface OnPressDrawerItem extends BaseDrawerItem {
  onPress: (navigation: ReturnType<typeof useNavigation>) => void;
}

export type DrawerItemProps = ScreenDrawerItem | OnPressDrawerItem;

const DrawerItem = ({ icon, label, color, ...props }: DrawerItemProps) => {
  const { logout } = useContext(AuthContext);
  const navigation =
    useNavigation<DrawerNavigationProp<HomeRoutes, "OutfitIdeas">>();

  const onLogout = (props: any) => {
    logout();
    props.onPress(navigation);
  };
  return (
    <RectButton
      onPress={() =>
        "screen" in props ? navigation.navigate(props.screen) : onLogout(props)
      }
    >
      <Box flexDirection="row" alignItems="center" padding="m">
        <RoundedIcon
          name={icon}
          size={36}
          iconRatio={0.5}
          backgroundColor={color}
          color="background"
        />
        <Text variant="button" color="secondary" marginLeft="m">
          {label}
        </Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
