import React from "react";
import { Box, Text, useTheme } from "../../components";
import SwipeableRow from "./SwipeableRow";

interface ItemProps {
  onDelete: () => void;
}

const Item = ({ onDelete }: ItemProps) => {
  const theme = useTheme();
  // @ts-ignore
  const height = 120 + theme.spacing.m * 2;
  return (
    <SwipeableRow onDelete={onDelete} height={height}>
      <Box padding="m" flexDirection="row">
        <Box
          width={120}
          height={120}
          // @ts-ignore
          borderRadius="m"
          style={{ backgroundColor: "#BFEAF5" }}
        />
        <Box paddingHorizontal="s" flex={1} justifyContent="center">
          <Text variant="header" style={{ fontSize: 12 }}>
            Size M, L
          </Text>
          <Text variant="title3" marginBottom="s" style={{ fontSize: 13 }}>
            Short Sleeve Organic Top
          </Text>
          <Text variant="title3" style={{ fontSize: 13 }} color="primary">
            $29.99
          </Text>
        </Box>
        <Box justifyContent="center">
          <Box
            backgroundColor="secondary"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 24,
              height: 24,
              borderRadius: 12,
            }}
          >
            <Text
              variant="header"
              style={{ fontSize: 10, lineHeight: 12 }}
              color="background"
            >
              x2
            </Text>
          </Box>
        </Box>
      </Box>
    </SwipeableRow>
  );
};

export default Item;
