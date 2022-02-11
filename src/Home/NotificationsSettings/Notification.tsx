import React, { useState } from "react";
import { Switch } from "react-native";
import { Box, Text, useTheme } from "../../components";

interface NotificationProps {
  title: string;
  description: string;
}

const Notification = ({ title, description }: NotificationProps) => {
  const theme = useTheme();
  const [toggled, setToggled] = useState(false);
  return (
    <Box flexDirection="row" marginBottom="m">
      <Box flex={1} justifyContent="center">
        <Text variant="title3">{title}</Text>
        <Text variant="body">{description}</Text>
      </Box>
      <Box paddingVertical="m">
        <Switch
          value={toggled}
          onValueChange={setToggled}
          trackColor={{
            true: theme.colors.primary,
            false: theme.colors.info,
          }}
        />
      </Box>
    </Box>
  );
};

export default Notification;
