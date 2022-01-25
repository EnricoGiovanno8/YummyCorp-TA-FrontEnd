import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";

import Slide, { SLIDE_HEIGHT, BORDER_RADIUS } from "./Slide";
import Subslide from "./Subslide";
import Dot from "./Dot";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: "#BFEAF5",
    picture: require("../../../assets/1.png")
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of outfit ideas",
    color: "#BEECC4",
    picture: require("../../../assets/2.png")
  },
  {
    title: "Excentric",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individual and unique style and look amazing everyday",
    color: "#FFE4D9",
    picture: require("../../../assets/3.png")
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
    color: "#FFDDDD",
    picture: require("../../../assets/4.png")
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

interface OnBoardingProps {
  navigation: any;
}

const OnBoarding = ({ navigation }: OnBoardingProps) => {
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
                    return navigation.navigate("Welcome")
                  }
                  if (scroll.current) {
                    scroll.current.scrollTo({ x: width * (index + 1) });
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
