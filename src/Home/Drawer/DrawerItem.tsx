import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { RoundedIcon } from "../../components";
import { Theme, Box, Text } from "../../components/Theme";

export interface DrawerItemProps {
  icon: any;
  label: string;
  screen: string;
  color: keyof Theme["colors"];
}

const DrawerItem = ({ icon, label, screen, color }: DrawerItemProps) => {
  return (
    <RectButton>
      <Box flexDirection="row" alignItems="center" padding="m">
        <RoundedIcon name={icon} size={36} iconRatio={0.5} backgroundColor={color} color={"white"} />
        <Text variant="button" color="secondary" marginLeft="m">{label}</Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
