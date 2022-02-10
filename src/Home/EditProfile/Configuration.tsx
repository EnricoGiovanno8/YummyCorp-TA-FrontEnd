import React from "react";
import { ScrollView } from "react-native";
import { Box, Text } from "../../components";
import CheckboxGroup from "./CheckboxGroup";
import RoundedCheckboxGroup from "./RoundedCheckboxGroup";

const outfitType = [
  { value: "men", label: "For Men" },
  { value: "women", label: "For Women" },
  { value: "both", label: "For Both" },
];

const sizes = [
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" },
];

const colors = [
  { value: "#0C0D34", label: "Navy" },
  { value: "#FF0058", label: "Pink" },
  { value: "#50B9DE", label: "Blue" },
  { value: "#00D99A", label: "Green" },
  { value: "#FE5E33", label: "Orange" },
];

const preferredBrands = [
  { value: "adidas", label: "Adidas" },
  { value: "nike", label: "Nike" },
  { value: "converse", label: "Converse" },
  { value: "tommy-hilfiger", label: "Tommy Hilfiger" },
  { value: "billionaire-boys-club", label: "Billionaire Boys Club" },
  { value: "jordan", label: "Jordan" },
  { value: "le-coq-sportif", label: "Le Coq Sportif" },
];

const Configuration = () => {
  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body">What type of outfit you usually wear?</Text>
        <CheckboxGroup options={outfitType} />
        <Text variant="body">What is your clothing size?</Text>
        <RoundedCheckboxGroup options={sizes} />
        <Text variant="body">What is your preferred colors?</Text>
        <RoundedCheckboxGroup options={colors} />
        <Text variant="body">What is your preferred brands?</Text>
        <CheckboxGroup options={preferredBrands} />
      </Box>
    </ScrollView>
  );
};

export default Configuration;
