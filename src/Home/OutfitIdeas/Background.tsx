import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Box, useTheme } from "../../components";

const Background = () => {
  const theme = useTheme();
  return (
    <View style={StyleSheet.absoluteFill}>
      <Box flex={1 / 3} backgroundColor="orange">
        <ImageBackground
          source={require("./assets/background.jpg")}
          style={{ flex: 1 }}
        >
          {/*@ts-ignore: Object is possibly 'undefined'.*/}
          <Box flex={1} backgroundColor="white" borderBottomRightRadius="xl" />
        </ImageBackground>
      </Box>
      <Box flex={1 / 3} backgroundColor="secondary">
        <Box flex={1} backgroundColor="white" />
        <Box flex={1} backgroundColor="secondary" />
        <Image
          source={require("./assets/background.jpg")}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
            //@ts-ignore: Object is possibly 'undefined'.
            borderTopLeftRadius: theme.borderRadii.xl,
            //@ts-ignore: Object is possibly 'undefined'.
            borderBottomRightRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
      <Box flex={1 / 3}>
        <ImageBackground
          source={require("./assets/background.jpg")}
          style={{ flex: 1 }}
        >
          {/*@ts-ignore: Object is possibly 'undefined'.*/}
          <Box flex={1} backgroundColor="secondary" borderTopLeftRadius="xl" />
        </ImageBackground>
      </Box>
    </View>
  );
};

export default Background;
