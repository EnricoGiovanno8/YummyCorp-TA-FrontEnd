import React from "react";
import { Box } from "../../components";
import { palette } from "../../components/Theme";

interface ItemProps {}

const Item = () => {
  return (
    <Box padding="m" flexDirection="row">
      <Box
        width={120}
        height={120}
        // @ts-ignore
        borderRadius="m"
        style={{ backgroundColor: palette.yellow }}
      />
    </Box>
  );
};

export default Item;
