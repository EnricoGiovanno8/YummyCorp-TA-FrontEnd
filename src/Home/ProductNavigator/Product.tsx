import React, { useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  aspectRatio,
  Box,
  Header,
  palette,
  Text,
  useTheme,
} from "../../components";
import { ProductNavigationProps } from "../../components/Navigation";
import { Feather as Icon } from "@expo/vector-icons";
import { clamp } from "react-native-redash";

const Product = ({ navigation }: ProductNavigationProps<"Product">) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const { width: sWidth, height: sHeight } = Dimensions.get("screen");
  const theme = useTheme();

  const styles = StyleSheet.create({
    blackFilterDrawer: {
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "absolute",
      height: sHeight,
      width: sWidth,
      bottom: -sHeight,
    },
    filterDrawer: {
      backgroundColor: palette.white,
      position: "absolute",
      bottom: -0.81 * sHeight,
      width: sWidth,
      height: 0.81 * sHeight,
      // @ts-ignore
      borderTopLeftRadius: theme.borderRadii.ll,
      // @ts-ignore
      borderTopRightRadius: theme.borderRadii.ll,
      elevation: 5,
      shadowColor: "black",
      shadowOpacity: 1,
    },
    filterDrawerCursor: {
      height: 5 * aspectRatio,
      backgroundColor: theme.colors.info,
      width: 60 * aspectRatio,
      borderRadius: 2.5 * aspectRatio,
    },
  });

  const filterDrawerPosition = useSharedValue(0);
  const blackFilterDrawerPosition = useSharedValue(0);

  const animatedFilterDrawer = useAnimatedStyle(() => ({
    transform: [{ translateY: filterDrawerPosition.value }],
  }));
  const animatedBlackFilterDrawer = useAnimatedStyle(() => ({
    transform: [{ translateY: blackFilterDrawerPosition.value }],
  }));

  const callOutDrawer = () => {
    Keyboard.dismiss();
    filterDrawerPosition.value = withTiming(-0.81 * sHeight, {
      duration: 500,
    });
    blackFilterDrawerPosition.value = withTiming(-sHeight, {
      duration: 500,
    });
  };

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number }
  >({
    onStart: (_, ctx) => {
      ctx.y = filterDrawerPosition.value;
    },
    onActive: ({ translationY }, ctx) => {
      filterDrawerPosition.value = clamp(
        ctx.y + translationY,
        -0.81 * sHeight,
        0
      );
      blackFilterDrawerPosition.value = clamp(
        ctx.y + translationY - 0.19 * sHeight,
        -sHeight,
        0
      );
    },
    onEnd: () => {
      if (filterDrawerPosition.value >= -650) {
        filterDrawerPosition.value = withTiming(0, {
          duration: 500,
        });
        blackFilterDrawerPosition.value = withTiming(0, {
          duration: 500,
        });
      } else {
        filterDrawerPosition.value = -0.81 * sHeight;
        blackFilterDrawerPosition.value = -sHeight;
      }
    },
  });
  const onTapEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: () => {
      filterDrawerPosition.value = withTiming(0, {
        duration: 500,
      });
      blackFilterDrawerPosition.value = withTiming(0, {
        duration: 500,
      });
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Box flex={1} backgroundColor="background">
        <Header
          title="Home"
          left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
          right={{ icon: "heart", onPress: () => navigation.navigate("Cart") }}
        />
        <Box flex={1} marginHorizontal="m" paddingTop="s">
          <Searchbar
            value={searchKeyword}
            onChangeText={(text) => setSearchKeyword(text)}
            onSubmitEditing={() => console.log(searchKeyword)}
            blurOnSubmit
            autoComplete={false}
          />
          <TouchableOpacity
            style={{ width: 103, marginTop: 16 }}
            onPress={() => callOutDrawer()}
          >
            <Box
              paddingVertical="s"
              paddingHorizontal="m"
              // @ts-ignore
              borderRadius="l"
              borderWidth={1}
              alignSelf="flex-start"
              flexDirection="row"
              alignItems="center"
            >
              <Text variant="filter" marginRight="s">
                Filter
              </Text>
              <Icon name="filter" size={16} />
            </Box>
          </TouchableOpacity>
        </Box>
        <TapGestureHandler onGestureEvent={onTapEvent}>
          <Animated.View
            style={[styles.blackFilterDrawer, animatedBlackFilterDrawer]}
          />
        </TapGestureHandler>
        <Animated.View style={[styles.filterDrawer, animatedFilterDrawer]}>
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
              style={{
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.filterDrawerCursor} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default Product;
