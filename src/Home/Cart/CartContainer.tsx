import React, { FC, ReactNode, useState } from "react";
import { Dimensions, View } from "react-native";
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
import { clamp, snapPoint } from "react-native-redash";
import { Box, useTheme } from "../../components";

const { width } = Dimensions.get("window");
const aspectRatio = width / 375;
const height = 682 * aspectRatio;
const minHeight = 228 * aspectRatio;
const snapPoints = [-(height - minHeight), 0];

type ctxProps = {
  y: number;
};

interface CartContainerProps {
  children: ReactNode;
  CheckoutComponent: FC<{ minHeight: number, onEnd: boolean }>;
}

const CartContainer = ({ children, CheckoutComponent }: CartContainerProps) => {
  const [onEnd, setOnEnd] = useState(false)
  const theme = useTheme();
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ctxProps
  >({
    onStart: (_, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: ({ translationY }, ctx) => {
      translateY.value = clamp(
        ctx.y + translationY,
        // @ts-ignore
        snapPoints[0],
        snapPoints[1]
      );
    },
    onEnd: ({ velocityY }) => {
      const dest = snapPoint(translateY.value, velocityY, snapPoints);
      translateY.value = withSpring(dest, { overshootClamping: true });
      if (dest === 0) {
        runOnJS(setOnEnd)(false)
      } else {
        runOnJS(setOnEnd)(true)
      }
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  return (
    <Box flex={1}>
      <CheckoutComponent minHeight={minHeight} onEnd={onEnd} />
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
            backgroundColor: "white",
            // @ts-ignore
            borderBottomLeftRadius: theme.borderRadii.xl,
            // @ts-ignore
            borderBottomRightRadius: theme.borderRadii.xl,
            overflow: "hidden",
          },
          style,
        ]}
      >
        {children}
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              // @ts-ignore
              height: theme.borderRadii.xl,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 5 * aspectRatio,
                backgroundColor: theme.colors.background2,
                width: 60 * aspectRatio,
                borderRadius: 2.5 * aspectRatio,
                marginBottom: theme.spacing.m,
              }}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Box>
  );
};

export default CartContainer;
