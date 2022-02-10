import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { Dimensions } from "react-native";
import { Box, Header, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Tabs from "./Tabs";

const { width } = Dimensions.get("window");

const tabs = [
  {
    id: "configuration",
    title: "Configuration",
  },
  {
    id: "info",
    title: "Personal Info",
  },
];

const EditProfile = ({ navigation }: HomeNavigationProps<"EditProfile">) => {
  return (
    <Box flex={1} backgroundColor="background">
      <Box flex={0.25} backgroundColor="background">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          // @ts-ignore: Object is possibly 'undefined'.
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        >
          <Header
            title="Edit Profile"
            left={{
              icon: "menu",
              onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
            }}
            dark
          />
        </Box>
      </Box>
      <Box>
        <Box
          left={width / 2 - 50}
          backgroundColor="primary"
          width={100}
          height={100}
          style={{ borderRadius: 50, top: -50 }}
        />
        <Box marginBottom="m" style={{ marginTop: -30 }}>
          <Text variant="title1" textAlign="center">
            Mike Peter
          </Text>
          <Text variant="body" textAlign="center">
            mike@flexinstudio.com
          </Text>
        </Box>
      </Box>
      <Tabs tabs={tabs}></Tabs>
    </Box>
  );
};

export default EditProfile;
