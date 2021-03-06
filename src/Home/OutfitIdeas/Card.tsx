import React from "react";
import {
  Dimensions,
  ImageRequireSource,
  StyleSheet,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { mix, mixColor, snapPoint } from "react-native-redash";
import { Box } from "../../components";

const { width: wWidth } = Dimensions.get("window");
const width = wWidth * 0.8;
const height = width * (425 / 294);
const borderRadius = 24;
const snapPoints = [-wWidth, 0, wWidth];

interface CardProps {
  onSwipe: () => void;
  source: ImageRequireSource;
  step: number;
  index: number;
  aIndex: Animated.SharedValue<number>;
}

type ContextInterface = {
  x: number;
  y: number;
};

const Card = ({ onSwipe, source, step, index, aIndex }: CardProps) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const position = useDerivedValue(() => index * step - aIndex.value);
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
      context.y = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
      translateY.value = event.translationY + context.y;
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateY.value = withSpring(0, {
        velocity: velocityY,
      });
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        dest,
        {
          overshootClamping: dest === 0 ? false : true,
          restSpeedThreshold: dest === 0 ? 0.01 : 100,
          restDisplacementThreshold: dest === 0 ? 0.01 : 100,
        },
        () => dest !== 0 && runOnJS(onSwipe)()
      );
    },
  });
  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          position.value,
          [0, step],
          [1.2, 1],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));
  const cardStyle = useAnimatedStyle(() => {
    const scale = mix(position.value, 1, 0.9);
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { scale },
      ],
      backgroundColor: mixColor(position.value, "#C9E9E7", "#74BCB8"),
    };
  });

  return (
    <Box
      style={StyleSheet.absoluteFill}
      justifyContent="center"
      alignItems="center"
    >
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              width,
              height,
              borderRadius,
              overflow: "hidden",
            },
            cardStyle,
          ]}
        >
          <Animated.Image
            {...{ source }}
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                width: undefined,
                height: undefined,
              },
              imageStyle,
            ]}
          />
        </Animated.View>
      </PanGestureHandler>
    </Box>
  );
};

export default Card;
