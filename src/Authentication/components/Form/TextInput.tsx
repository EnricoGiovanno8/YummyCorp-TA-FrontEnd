import React, { useState } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Box, theme } from "../../../components";
import { Feather as Icon } from "@expo/vector-icons";

const { borderRadii, colors } = theme;

interface TextInputProps extends RNTextInputProps {
  icon: "mail" | "lock";
  validator: (input: string) => boolean;
}

// @ts-ignore: Object is possibly 'undefined'.
const SIZE = borderRadii.m * 2;
const Valid = true;
const Invalid = false;
const Pristine = null;
type InputState = typeof Valid | typeof Invalid | typeof Pristine;

const TextInput = ({ icon, validator, ...props }: TextInputProps) => {
  const [input, setInput] = useState("");
  const [state, setState] = useState<InputState>(null);

  const validate = () => {
    const valid = validator(input);
    setState(valid);
  };

  const onChangeText = (text: string) => {
    setInput(text);
    validate();
  };

  const reColor: keyof typeof colors =
    state === Pristine ? "text" : state === Valid ? "primary" : "danger";
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
          onBlur={validate}
          {...{ onChangeText }}
          {...props}
        />
      </Box>
      {(state === Valid || state === Invalid) && (
        <Box
          // @ts-ignore: Object is possibly 'undefined'.
          style={{ borderRadius: borderRadii.m }}
          marginRight="m"
          alignItems="center"
          justifyContent="center"
          height={SIZE}
          width={SIZE}
          backgroundColor={state === Valid ? "primary" : "danger"}
        >
          <Icon name={state === Valid ? "check" : "x"} color="white" />
        </Box>
      )}
    </Box>
  );
};

export default TextInput;
