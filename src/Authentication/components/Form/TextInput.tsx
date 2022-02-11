import React, { forwardRef } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Box, useTheme, RoundedIcon } from "../../../components";
import { Feather as Icon } from "@expo/vector-icons";

interface TextInputProps extends RNTextInputProps {
  icon: any;
  touched?: boolean;
  error?: boolean;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ icon, error, touched, ...props }: TextInputProps, ref) => {
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
        paddingHorizontal="m"
      >
        <Box paddingRight="m">
          <Icon name={icon} size={16} {...{ color }} />
        </Box>
        <Box flex={1}>
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor={color}
            {...{ ref }}
            {...props}
          />
        </Box>
        {touched && (
          <RoundedIcon
            name={!error ? "check" : "x"}
            size={SIZE}
            backgroundColor={!error ? "primary" : "danger"}
            color="background"
          />
        )}
      </Box>
    );
  }
);

export default TextInput;
