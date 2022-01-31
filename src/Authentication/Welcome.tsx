import React from "react";
import { Text, Box, Button } from "../components";
import { Dimensions, Image, Platform } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Routes } from "../components/Navigation";
import { useTheme } from "../components/Theme";
import Constants from "expo-constants";
import { RectButton } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const picture = {
  src: require("./assets/5.png"),
  width: 3383,
  height: 5074,
};

export const assets = [picture.src];

// interface WelcomeProps {

// }

const Welcome = ({ navigation }: StackScreenProps<Routes, "Welcome">) => {
  const theme = useTheme();
  const { colors, borderRadii, spacing } = theme;

  return (
    <Box
      style={{
        backgroundColor: colors.white,
        height:
          height + (Platform.OS === "android" ? Constants.statusBarHeight : 0),
      }}
    >
      <Box
        flex={1}
        style={{
          // @ts-ignore: Object is possibly 'undefined'.
          borderBottomRightRadius: borderRadii.xl,
          backgroundColor: colors.grey,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Image
          source={picture.src}
          style={{
            // @ts-ignore: Object is possibly 'undefined'.
            width: width - borderRadii.xl,
            height:
              // @ts-ignore: Object is possibly 'undefined'.
              ((width - borderRadii.xl) * picture.height) / picture.width,
          }}
        />
      </Box>
      <Box
        flex={1}
        style={{
          // @ts-ignore: Object is possibly 'undefined'.
          borderBottomLeftRadius: borderRadii.xl,
        }}
      >
        <Box
          style={{
            backgroundColor: colors.grey,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <Box
          style={{
            backgroundColor: "white",
            // @ts-ignore: Object is possibly 'undefined'.
            borderTopLeftRadius: borderRadii.xl,
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "center",
            // @ts-ignore: Object is possibly 'undefined'.
            padding: spacing.xl,
          }}
        >
          <Text variant="title2">Let's get started</Text>
          <Text variant="body">
            Login to your account below or signup for an amazing experience
          </Text>
          <Button
            variant="primary"
            label="Have an account? Login"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            label="Join us, it's Free"
            onPress={() => navigation.navigate("SignUp")}
          />
          <RectButton
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text variant="button" color="secondary">
              Forgot Password?
            </Text>
          </RectButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
