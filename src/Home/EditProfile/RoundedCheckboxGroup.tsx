import React, { useState } from "react";
import { Box, Button } from "../../components";

interface RoundedCheckboxGroupProps {
  options: { value: string; label: string }[];
}

const RoundedCheckboxGroup = ({ options }: RoundedCheckboxGroupProps) => {
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
      {options.map(({ value, label }) => (
        <Button
          key={value}
          variant={selectedValues.indexOf(value) !== -1 ? "primary" : "default"}
          onPress={() => select(value)}
          label={label}
          style={{
            width: "auto",
            height: "auto",
            padding: 16,
            marginBottom: 8,
            marginRight: 4,
          }}
        />
      ))}
    </Box>
  );
};

export default RoundedCheckboxGroup;
