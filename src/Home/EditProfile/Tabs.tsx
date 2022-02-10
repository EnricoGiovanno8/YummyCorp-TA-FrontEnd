import React, { useState } from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Box, Text, useTheme } from "../../components";
import Configuration from "./Configuration";
import PersonalInfo from "./PersonalInfo";

// const { width } = Dimensions.get("window");

interface Tab {
  id: string;
  title: string;
}

interface TabProps {
  tabs: Tab[];
}

const Tabs = ({ tabs }: TabProps) => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);

  return (
    <Box flex={1}>
      <Box flexDirection="row">
        {tabs.map((tab, i) => (
          <RectButton
            key={i}
            style={{ flex: 1 }}
            onPress={() => {
              setIndex(i);
            }}
          >
            <Box padding="m" paddingBottom="s">
              <Text
                variant="title3"
                textAlign="center"
                color={i === index ? "primary" : "secondary"}
              >
                {tab.title}
              </Text>
              {i === index && (
                <View
                  style={{
                    alignSelf: "center",
                    marginTop: 10,
                    backgroundColor: theme.colors.primary,
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                  }}
                />
              )}
            </Box>
          </RectButton>
        ))}
      </Box>
      {index === 0 ? (
        <Box flex={1}>
          <Configuration />
        </Box>
      ) : (
        <Box flex={1}>
          <PersonalInfo />
        </Box>
      )}
    </Box>
  );
};

export default Tabs;
