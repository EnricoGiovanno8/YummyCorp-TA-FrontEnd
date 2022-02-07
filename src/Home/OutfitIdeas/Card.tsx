import React from "react";
import {
  Dimensions,
  Image,
  ImageRequireSource,
  StyleSheet,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
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
  onSwipe: () => void;
  source: ImageRequireSource;
}

type ContextInterface = {
  translateX: number;
  translateY: number;
};

const Card = ({ onSwipe, source }: CardProps) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (_, context) => {
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
        y.value = withSpring(0);
        runOnJS(onSwipe)()
      } else if (x.value < 0.5 * -width) {
        x.value = withSpring(-width);
        y.value = withSpring(0);
        runOnJS(onSwipe)()
      } else {
        x.value = withSpring(0);
        y.value = withSpring(0);
      }
    },
  });
  const cardStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: "#C9E9E7",
      width,
      height,
      borderRadius,
      transform: [{ translateY: y.value }, { translateX: x.value }],
    };
  });
  return (
    <Box
      style={StyleSheet.absoluteFill}
      justifyContent="center"
      alignItems="center"
    >
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={cardStyle}>
          <Image
            {...{ source }}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: undefined,
              height: undefined,
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </Box>
  );
};

export default Card;
