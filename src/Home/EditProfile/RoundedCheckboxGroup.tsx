import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Box, Text, useTheme } from "../../components";
import { Feather as Icon } from "@expo/vector-icons";

interface RoundedCheckboxGroupProps {
  options: { value: string; label: string }[];
  valueIsColor?: boolean;
}

const RoundedCheckboxGroup = ({
  options,
  valueIsColor,
}: RoundedCheckboxGroupProps) => {
  const theme = useTheme();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const select = (value: string) => {
    const exist = selectedValues.filter((sV) => sV === value);

    if (exist.length > 0) {
      const newArray = selectedValues.filter((sV) => sV !== value);
      setSelectedValues(newArray);
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };
  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop="s">
      {options.map(({ value, label }) => {
        const backgroundColor =
          selectedValues.indexOf(value) !== -1
            ? theme.colors.primary
            : theme.colors.background2;
        let backgroundColorIsColor = "white";
        if (valueIsColor) {
          backgroundColorIsColor = value;
        }
        return (
          <TouchableOpacity key={value} onPress={() => select(value)}>
            {!valueIsColor && (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                  marginRight: 8,
                }}
              >
                <Text
                  textAlign="center"
                  variant="header"
                  color={
                    selectedValues.indexOf(value) !== -1
                      ? "textContrast"
                      : "secondary"
                  }
                >
                  {label.toUpperCase()}
                </Text>
              </View>
            )}
            {valueIsColor && selectedValues.indexOf(value) !== -1 && (
              <Box
                alignItems="center"
                style={{ marginBottom: 16, marginRight: 8 }}
              >
                <Box
                  width={50}
                  height={50}
                  justifyContent="center"
                  alignItems="center"
                >
                  <View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      borderRadius: 25,
                      borderColor: backgroundColorIsColor,
                      borderWidth: 1,
                    }}
                  />
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: backgroundColorIsColor,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon color="white" name="check" size={18} />
                  </View>
                </Box>
              </Box>
            )}
            {valueIsColor && selectedValues.indexOf(value) === -1 && (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: backgroundColorIsColor,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                  marginRight: 8,
                }}
              ></View>
            )}
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

export default RoundedCheckboxGroup;
