import React from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Box, useTheme } from "../../../components";
import { Feather as Icon } from "@expo/vector-icons";

interface TextInputProps extends RNTextInputProps {
  icon: "mail" | "lock";
  touched?: boolean;
  error?: boolean;
}

const TextInput = ({ icon, error, touched, ...props }: TextInputProps) => {
  const theme = useTheme();
  const { borderRadii, colors } = theme;
  // @ts-ignore: Object is possibly 'undefined'.
  const SIZE = borderRadii.m * 2;
  const reColor = !touched ? "text" : error ? "danger" : "primary";
  const color = colors[reColor];

  return (
    <Box
      flexDirection="row"
      height={48}
      alignItems="center"
      borderWidth={StyleSheet.hairlineWidth}
      // @ts-ignore: Object is possibly 'undefined'.
      borderRadius="s"
      borderColor={reColor}
    >
      <Box padding="m">
        <Icon name={icon} size={16} {...{ color }} />
      </Box>
      <Box flex={1}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          {...props}
        />
      </Box>
      {touched && (
        <Box
          // @ts-ignore: Object is possibly 'undefined'.
          style={{ borderRadius: borderRadii.m }}
          marginRight="m"
          alignItems="center"
          justifyContent="center"
          height={SIZE}
          width={SIZE}
          backgroundColor={!error ? "primary" : "danger"}
        >
          <Icon name={!error ? "check" : "x"} color="white" />
        </Box>
      )}
    </Box>
  );
};

export default TextInput;
