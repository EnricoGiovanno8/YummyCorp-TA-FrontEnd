import { BoxProps } from "@shopify/restyle";
import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import { Box } from "../../components";
import { Theme } from "../../components/Theme";

export const CARD_HEIGHT = 160

interface CardProps {
  onPress: () => void;
  children: ReactNode;
  backgroundColor: BoxProps<Theme>["backgroundColor"]
}

const CardLayout = ({ onPress, children, backgroundColor }: CardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        padding="m"
        marginLeft="m"
        // @ts-ignore
        borderRadius="m"
        width={120}
        height={CARD_HEIGHT}
        backgroundColor={backgroundColor}
      >
        {children}
      </Box>
    </TouchableOpacity>
  );
};

export default CardLayout;
