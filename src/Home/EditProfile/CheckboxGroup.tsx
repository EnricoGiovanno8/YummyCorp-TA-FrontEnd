import React, { useState } from "react";
import { Box, Button } from "../../components";

interface CheckboxGroupProps {
  options: { value: string; label: string }[];
  radio?: boolean;
}

const CheckboxGroup = ({ options, radio }: CheckboxGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const select = (value: string, radio: boolean | undefined) => {
    if (radio) {
      setSelectedValues([value]);
    } else {
      const exist = selectedValues.filter((sV) => sV === value);

      if (exist.length > 0) {
        const newArray = selectedValues.filter((sV) => sV !== value);
        setSelectedValues(newArray);
      } else {
        setSelectedValues([...selectedValues, value]);
      }
    }
  };
  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop="s">
      {options.map(({ value, label }) => (
        <Button
          key={value}
          variant={selectedValues.indexOf(value) !== -1 ? "primary" : "default"}
          onPress={() => select(value, radio)}
          label={label}
          style={{
            width: "auto",
            height: "auto",
            padding: 16,
            marginBottom: 16,
            marginRight: 8,
          }}
        />
      ))}
    </Box>
  );
};

export default CheckboxGroup;
