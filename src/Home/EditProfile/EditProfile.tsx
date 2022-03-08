import { DrawerActions } from "@react-navigation/native";
import React, { useContext } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { Box, Header, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Tabs from "./Tabs";
import AuthContext from "../../../context/AuthContext";
import { URL } from "../../../context";

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
  const { user } = useContext(AuthContext);
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
          style={{
            borderRadius: 50,
            top: -50,
            borderColor: "rgba(12, 13, 52, 0.1)",
          }}
          overflow="hidden"
          borderWidth={1}
        >
          {user && user.image && (
            <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
              <Image
                source={{ uri: `${URL}/profile-picture/${user.image}` }}
                style={{
                  resizeMode: "cover",
                  height: "100%",
                }}
              />
            </TouchableOpacity>
          )}
        </Box>
        <Box marginBottom="m" style={{ marginTop: -30 }}>
          <Text variant="title1" textAlign="center">
            {user?.name}
          </Text>
          <Text variant="body" textAlign="center">
            {user?.email}
          </Text>
        </Box>
      </Box>
      <Tabs tabs={tabs}></Tabs>
    </Box>
  );
};

export default EditProfile;
