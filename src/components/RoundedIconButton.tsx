import React from "react";
import { RectButton } from "react-native-gesture-handler";
import RoundedIcon from "./RoundedIcon";
import { RoundedIconProps } from "./RoundedIcon";

interface RoundedIconButtonProps extends RoundedIconProps {
  onPress: () => void;
}

const RoundedIconButton = ({ onPress, ...props }: RoundedIconButtonProps) => {
  return (
    <RectButton {...{ onPress }}>
      <RoundedIcon {...props} />
    </RectButton>
  );
};

RoundedIconButton.defaultProps = {
  iconRatio: 0.5,
};

export default RoundedIconButton;
