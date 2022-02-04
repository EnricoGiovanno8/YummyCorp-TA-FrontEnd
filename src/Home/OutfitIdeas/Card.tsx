import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { mix, mixColor } from "react-native-redash";
import { Box } from "../../components";

const { width: wWidth } = Dimensions.get("window");
const width = wWidth * 0.8;
const height = width * (425 / 294);
const borderRadius = 24;

interface CardProps {
  position: number;
}

type ContextInterface = {
  translateX: number;
  translateY: number;
};

const Card = ({ position }: CardProps) => {
  const backgroundColor = mixColor(position, "#C9E9E7", "#74BCB8");
  const translateYOffset = mix(position, 0, -50);
  const scale = mix(position, 1, 0.9);

  const x = useSharedValue(0);
  const y = useSharedValue(translateYOffset);
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (event, context) => {
      context.translateX = x.value;
      context.translateY = y.value;
    },
    onActive: (event, context) => {
      x.value = event.translationX + context.translateX;
      y.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      if (x.value > 0.5 * width) {
        x.value = withSpring(width);
        y.value = withSpring(translateYOffset);
      } else if (x.value < 0.5 * -width) {
        x.value = withSpring(-width);
        y.value = withSpring(translateYOffset);
      } else {
        x.value = withSpring(0);
        y.value = withSpring(translateYOffset);
      }
    },
  });
  const cardStyle = useAnimatedStyle(() => {
    return {
      backgroundColor,
      width,
      height,
      borderRadius,
      transform: [{ translateY: y.value }, { translateX: x.value }, { scale }],
    };
  });
  return (
    <Box
      style={StyleSheet.absoluteFill}
      justifyContent="center"
      alignItems="center"
    >
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{ ...cardStyle }} />
      </PanGestureHandler>
    </Box>
  );
};

export default Card;
