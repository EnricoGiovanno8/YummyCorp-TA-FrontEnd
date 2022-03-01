import React, { FC, ReactNode, useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
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
  withTiming,
} from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";
import { CardContext, CartContext } from "../../../context";
import { Box, Button, useTheme } from "../../components";
import { CreditCardInput } from "react-native-credit-card-input";
// import createStripe from "stripe-client";

const { width } = Dimensions.get("window");
const { height: sHeight, width: sWidth } = Dimensions.get("screen");
const aspectRatio = width / 375;
const height = 682 * aspectRatio;
const minHeight = 228 * aspectRatio;
const snapPoints = [-(height - minHeight), 0];

type ctxProps = {
  y: number;
};

interface CartContainerProps {
  children: ReactNode;
  CheckoutComponent: FC<{
    minHeight: number;
    onEnd: boolean;
    onAddCreditCard: () => void;
  }>;
}

// const stripe = createStripe(
//   "pk_test_51KKDpVKuasnJKlhE4grMDh8rDlvGqxZaIiPiAx90HrxOvHgTahlirUbPrAyGy4DTBmr3mdrESEgXLXqDltuNwysJ00mooIakDc"
// );

const CartContainer = ({ children, CheckoutComponent }: CartContainerProps) => {
  const { cart } = useContext(CartContext);
  const { createNewCard } = useContext(CardContext);
  const [onEnd, setOnEnd] = useState<boolean>(false);
  const [creditCardInputData, setCreditCardInputData] = useState<any>(null);
  const [creditCardInputComplete, setCreditCardInputComplete] =
    useState<boolean>(false);

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
        runOnJS(setOnEnd)(false);
      } else {
        runOnJS(setOnEnd)(true);
      }
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const styles = StyleSheet.create({
    blackFilterDrawer: {
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "absolute",
      height: sHeight,
      width: sWidth,
      bottom: -sHeight,
    },
  });
  const blackFilterDrawerPosition = useSharedValue(0);
  const animatedBlackFilterDrawer = useAnimatedStyle(() => ({
    transform: [{ translateY: blackFilterDrawerPosition.value }],
  }));

  const onAddCreditCard = () => {
    blackFilterDrawerPosition.value = withTiming(-sHeight, {
      duration: 500,
    });
  };

  const onChangeCreditCardInput = (formData: any) => {
    const isComplete = formData.valid === true;
    if (isComplete) {
      setCreditCardInputComplete(true);
      setCreditCardInputData(formData);
    } else {
      setCreditCardInputComplete(false);
    }
  };

  const onCancelCreditCardInput = () => {
    blackFilterDrawerPosition.value = withTiming(0, {
      duration: 500,
    });
  };

  const onAddCard = async () => {
    console.log(creditCardInputData)
    if (creditCardInputData) {
      const { cvc, expiry, number, type } = creditCardInputData.values;
      const data = {
        number: number.replace(/ /g, ""),
        expMonth: expiry.slice(0, 2),
        expYear: expiry.slice(3),
        cvc,
        type: type.replace("-", "").toUpperCase(),
      };
      await createNewCard(data);
      blackFilterDrawerPosition.value = withTiming(0, {
        duration: 500,
      });
    }
  };
  return (
    <Box flex={1}>
      <CheckoutComponent
        minHeight={minHeight}
        onEnd={onEnd}
        onAddCreditCard={onAddCreditCard}
      />
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
        {cart.length === 0 ? null : (
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                // @ts-ignore
                height: theme.borderRadii.l + 10,
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
        )}
      </Animated.View>
      <Animated.View
        style={[styles.blackFilterDrawer, animatedBlackFilterDrawer]}
      >
        <Box flex={1} alignItems="center" justifyContent="center">
          <Box
            width={380}
            height="auto"
            backgroundColor="background"
            // @ts-ignore
            borderRadius="l"
            padding="l"
          >
            <CreditCardInput
              onChange={(formData: any) => onChangeCreditCardInput(formData)}
              labels={{ number: "CARD NUMBER", expiry: "EXPIRY", cvc: "CVC" }}
              allowScroll
            />
            <Box
              flexDirection="row"
              marginTop="m"
              justifyContent="space-between"
            >
              <Button
                label="Cancel"
                onPress={() => onCancelCreditCardInput()}
                style={{
                  width: "47.5%",
                  backgroundColor: theme.colors.primaryLight,
                }}
              />
              <Button
                label="Add Card"
                variant="primary"
                style={{ width: "47.5%" }}
                onPress={onAddCard}
                disabled={creditCardInputComplete ? false : true}
                opacity={creditCardInputComplete ? 1 : 0.5}
              />
            </Box>
          </Box>
        </Box>
      </Animated.View>
    </Box>
  );
};

export default CartContainer;
