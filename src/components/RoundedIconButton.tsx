import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import RoundedIcon from "./RoundedIcon";
import { RoundedIconProps } from "./RoundedIcon";

interface RoundedIconButtonProps extends RoundedIconProps {
  onPress: () => void;
}

const RoundedIconButton = ({ onPress, ...props }: RoundedIconButtonProps) => {
  return (
    <TouchableOpacity {...{ onPress }}>
      <RoundedIcon {...props} />
    </TouchableOpacity>
  );
};

RoundedIconButton.defaultProps = {
  ...RoundedIcon.defaultProps,
};

export default RoundedIconButton;
