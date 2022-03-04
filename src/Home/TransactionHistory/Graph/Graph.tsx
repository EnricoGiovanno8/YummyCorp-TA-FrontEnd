import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTiming } from "react-native-redash";
import { Box, useTheme } from "../../../components";
import { Theme } from "../../../components/Theme";
import { lerp } from "./Scale";
import Underlay, { MARGIN } from "./Underlay";

const { width: wWidth } = Dimensions.get("window");
const aspectRatio = 195 / 305;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export interface DataPoint {
  date: number;
  value: number;
  color: keyof Theme["colors"];
  id: number;
}

interface GraphProps {
  data: DataPoint[];
  startDate: number;
  numberOfMonths: number;
}

const Graph = ({ data, startDate, numberOfMonths }: GraphProps) => {
  const isFocused = useIsFocused();
  const transition = useTiming(isFocused, { duration: 650 });
  const theme = useTheme();
  // @ts-ignore: Object is possibly 'undefined'.
  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * aspectRatio;
  // @ts-ignore: Object is possibly 'undefined'.
  const width = canvasWidth - theme.spacing[MARGIN];
  // @ts-ignore: Object is possibly 'undefined'.
  const height = canvasHeight - theme.spacing[MARGIN];

  const step = width / numberOfMonths;
  const values = data.map((p) => p.value);
  const maxY = Math.max(...values);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: transition.value }],
    };
  });

  return (
    <Box marginTop="xl" paddingLeft={MARGIN} paddingBottom={MARGIN}>
      <Underlay
        maxY={maxY}
        step={step}
      />
      <View style={{ width, height }}>
        {data.map((point) => {
          const i = Math.round(
            moment.duration(moment(point.date).diff(startDate)).asMonths()
          );
          return (
            <AnimatedBox
              key={point.id}
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={lerp(0, height, point.value / maxY)}
              style={animatedStyle}
            >
              <Box
                backgroundColor={point.color}
                position="absolute"
                top={0}
                bottom={0}
                left={theme.spacing.m}
                right={theme.spacing.m}
                opacity={0.1}
                // @ts-ignore: Object is possibly 'undefined'.
                borderTopLeftRadius="m"
                // @ts-ignore: Object is possibly 'undefined'.
                borderTopRightRadius="m"
              />
              <Box
                backgroundColor={point.color}
                position="absolute"
                top={0}
                height={32}
                left={theme.spacing.m}
                right={theme.spacing.m}
                // @ts-ignore: Object is possibly 'undefined'.
                borderRadius="m"
              />
            </AnimatedBox>
          );
        })}
      </View>
    </Box>
  );
};

export default Graph;
