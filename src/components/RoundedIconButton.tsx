import React from "react";
import { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RoundedIcon from "./RoundedIcon";
import { RoundedIconProps } from "./RoundedIcon";

interface RoundedIconButtonProps extends RoundedIconProps {
  onPress: () => void;
  disabled?: TouchableOpacityProps["disabled"]
}

const RoundedIconButton = ({ onPress, disabled, ...props }: RoundedIconButtonProps) => {
  return (
    <TouchableOpacity {...{ onPress, disabled }}>
      <RoundedIcon {...props} />
    </TouchableOpacity>
  );
};

RoundedIconButton.defaultProps = {
  ...RoundedIcon.defaultProps,
};

export default RoundedIconButton;
