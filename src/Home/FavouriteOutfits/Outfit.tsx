import React, { useState } from "react";
// import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Box, RoundedIcon } from "../../components";

// const { width: wWidth } = Dimensions.get("window");

interface OutfitProps {
  outfit: { id: number; color: string; aspectRatio: number };
  width: number;
  onSelectOutfit: (outfit: {
    id: number;
    color: string;
    aspectRatio: number;
  }) => void;
}

const Outfit = ({
  outfit: { id, color, aspectRatio },
  width,
  onSelectOutfit,
}: OutfitProps) => {
  const [selected, setSelected] = useState(false);

  const onPress = () => {
    setSelected(!selected);
    onSelectOutfit({ id, color, aspectRatio });
  };

  return (
    <TouchableOpacity {...{ onPress }}>
      <Box
        // @ts-ignore: Object is possibly 'undefined'.
        borderRadius="m"
        marginBottom="m"
        alignItems="flex-end"
        padding="m"
        style={{ backgroundColor: color, width, height: width * aspectRatio }}
      >
        {selected && (
          <RoundedIcon
            name="check"
            backgroundColor="primary"
            color="background"
            size={24}
          />
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default Outfit;
