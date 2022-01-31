import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { Box, Text } from "../../../components";

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

const Checkbox = ({ label, value, onChange }: CheckboxProps) => {
  return (
    <RectButton
      rippleColor="white"
      onPress={() => {
        onChange(!value);
      }}
      style={{ justifyContent: "center" }}
    >
      <Box flexDirection="row" alignItems="center">
        <Box
          marginRight="m"
          height={20}
          width={20}
          // @ts-ignore: Object is possibly 'undefined'.
          borderRadius="s"
          justifyContent="center"
          alignItems="center"
          borderWidth={1}
          borderColor="primary"
          backgroundColor={value ? "primary" : "white"}
        >
          <Icon name="check" color="white" />
        </Box>
        <Text variant="button">{label}</Text>
      </Box>
    </RectButton>
  );
};

export default Checkbox;
