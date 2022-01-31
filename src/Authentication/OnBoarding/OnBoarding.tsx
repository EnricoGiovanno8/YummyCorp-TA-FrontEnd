import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import Constants from "expo-constants";

import Slide, { SLIDE_HEIGHT } from "./Slide";
import Subslide from "./Subslide";
import Dot from "./Dot";
import { makeStyles, useTheme } from "../../components";
import { StackScreenProps } from "@react-navigation/stack";
import { Routes } from "../../components/Navigation";
import { Theme } from "../../components/Theme";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: "#BFEAF5",
    picture: {
      src: require("../assets/1.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of outfit ideas",
    color: "#BEECC4",
    picture: {
      src: require("../assets/2.png"),
      width: 2791,
      height: 3744,
    },
  },
  {
    title: "Excentric",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individual and unique style and look amazing everyday",
    color: "#FFE4D9",
    picture: {
      src: require("../assets/3.png"),
      width: 2738,
      height: 3244,
    },
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
    color: "#FFDDDD",
    picture: {
      src: require("../assets/4.png"),
      width: 1757,
      height: 2551,
    },
  },
];

export const assets = slides.map((slide) => slide.picture.src);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height:
      height + (Platform.OS === "android" ? Constants.statusBarHeight : 0),
    backgroundColor: "white",
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    // @ts-ignore: Object is possibly 'undefined'.
    borderBottomRightRadius: theme.borderRadii.xl,
    overflow: "hidden",
  },
  slider: {
    height: SLIDE_HEIGHT,
    // @ts-ignore: Object is possibly 'undefined'.
    borderBottomRightRadius: theme.borderRadii.xl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    // @ts-ignore: Object is possibly 'undefined'.
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    // @ts-ignore: Object is possibly 'undefined'.
    height: theme.borderRadii.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const OnBoarding = ({ navigation }: StackScreenProps<Routes, "OnBoarding">) => {
  const theme = useTheme();
  const styles = useStyles();
  // Scrolling Animation
  const scroll = useRef<ScrollView>(null);
  const x = useRef(new Animated.Value(0)).current;
  const scrollingAnimated = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: x,
          },
        },
      },
    ],
    { useNativeDriver: false }
  );
  const backgroundColorAnimated = x.interpolate({
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  const scrollTranslateX = x.interpolate({
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((_, i) => i * -width),
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ ...styles.slider, backgroundColor: backgroundColorAnimated }}
      >
        {slides.map((slide, index) => {
          const opacity = x.interpolate({
            inputRange: [
              (index - 0.5) * width,
              index * width,
              (index + 0.5) * width,
            ],
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`slide-image-${index}`}
              style={{ ...styles.underlay, opacity }}
            >
              <Image
                source={slide.picture.src}
                style={{
                  // @ts-ignore: Object is possibly 'undefined'.
                  width: width - theme.borderRadii.xl,
                  height:
                    // @ts-ignore: Object is possibly 'undefined'.
                    ((width - theme.borderRadii.xl) * slide.picture.height) /
                    slide.picture.width,
                }}
              />
            </Animated.View>
          );
        })}
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={scrollingAnimated}
        >
          {slides.map(({ title, picture }, index) => (
            <Slide key={index} {...{ title, picture }} right={!!(index % 2)} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: backgroundColorAnimated,
          }}
        />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot
                key={index}
                currentIndex={Animated.divide(x, width)}
                {...{ index }}
              />
            ))}
          </View>
          <Animated.View
            style={{
              flex: 1,
              flexDirection: "row",
              width: width * slides.length,
              transform: [{ translateX: scrollTranslateX }],
            }}
          >
            {slides.map(({ subtitle, description }, index) => (
              <Subslide
                key={index}
                onPress={() => {
                  if (index === slides.length - 1) {
                    return navigation.navigate("Welcome");
                  } else {
                    return scroll.current?.scrollTo({ x: width * (index + 1) });
                  }
                }}
                last={index === slides.length - 1}
                {...{ subtitle, description }}
              />
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;
