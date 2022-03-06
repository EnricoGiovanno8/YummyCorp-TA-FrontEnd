import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Animated,
  Easing,
  Alert,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import Svg, { Circle, G, Line, Rect, Text as SvgText } from "react-native-svg";
import { Box, useTheme } from "../../components";

const { width: wWidth } = Dimensions.get("window");
const aspectRatio = 195 / 305;

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);

interface BarchartProps {
  totalAmountOneYear: number[];
  showTooltip?: boolean;
}

const Month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Barchart = ({ totalAmountOneYear, showTooltip }: BarchartProps) => {
  const theme = useTheme();

  const [yAxisData, setYAxisData] = useState<string[]>([]);
  const [maxValue, setMaxValue] = useState<number>(0);
  const barchartData = totalAmountOneYear?.map((value, index) => {
    return {
      month: Month[index],
      value: value,
    };
  });

  // @ts-ignore
  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * aspectRatio;

  const marginLeftForYAxis = 40;
  const marginBottomForXAxis = 40;
  const paddingFromScreen = 40 / 2;
  const axisColor = theme.colors.info;
  const axisWidth = 2;
  const circleRadius = 4;
  const axisFontSize = 12;
  const barWidth = 20;

  const gapBetweenXAxisTicks = 40;
  const yAxisHeight = canvasHeight - paddingFromScreen - marginBottomForXAxis;
  const gapBetweenYAxisTicks =
    yAxisData?.length > 0 ? yAxisHeight / (yAxisData?.length - 1) : 0;

  const xAxisX1Point = marginLeftForYAxis;
  const xAxisY1Point = canvasHeight - marginBottomForXAxis;
  const xAxisX2Point =
    barchartData?.length > 0
      ? gapBetweenXAxisTicks +
        xAxisX1Point +
        gapBetweenXAxisTicks * barchartData?.length
      : 0;
  const xAxisY2Point = xAxisY1Point;

  const xAxisWidth = xAxisX2Point + circleRadius;

  const yAxisX1Point = marginLeftForYAxis;
  const yAxisY1Point = paddingFromScreen;
  const yAxisX2Point = marginLeftForYAxis;
  const yAxisY2Point = canvasHeight - marginBottomForXAxis;

  const minValue = 0;

  const gapBetweenYAxisValues = (maxValue - minValue) / 4;

  useEffect(() => {
    setMaxValue(
      Math.max.apply(
        Math,
        barchartData?.map((item) => item?.value)
      )
    );
  }, [barchartData]);

  const animatedAxisTickCircleOpacity = useRef(new Animated.Value(0)).current;
  const animatedXAxisWidth = useRef(new Animated.Value(xAxisX1Point)).current;
  const animatedYAxisHeight = useRef(new Animated.Value(yAxisY2Point)).current;

  useEffect(() => {
    const newLabels = Array.from({ length: 6 }).map((_, index) =>
      ((minValue + gapBetweenYAxisValues * index)/1000000).toFixed()
    );
    setYAxisData(newLabels);
    animationXAxis();
  }, [gapBetweenYAxisValues]);

  const animationXAxis = () => {
    Animated.timing(animatedAxisTickCircleOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    Animated.timing(animatedXAxisWidth, {
      toValue: xAxisX2Point,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    Animated.timing(animatedYAxisHeight, {
      toValue: yAxisY1Point,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const renderXAxis = () => {
    return (
      <G key={"xAxis"}>
        <AnimatedCircle
          cx={xAxisX2Point}
          cy={xAxisY2Point}
          fill={axisColor}
          r={circleRadius}
          opacity={animatedAxisTickCircleOpacity}
        />
        <AnimatedLine
          x1={xAxisX1Point}
          y1={xAxisY1Point}
          x2={animatedXAxisWidth}
          y2={xAxisY2Point}
          strokeWidth={axisWidth}
          stroke={axisColor}
        />
      </G>
    );
  };

  const renderYAxis = () => {
    return (
      <G key={"yAxis"}>
        <AnimatedCircle
          cx={yAxisX1Point}
          cy={yAxisY1Point}
          fill={axisColor}
          r={circleRadius}
          opacity={animatedAxisTickCircleOpacity}
        />
        <AnimatedCircle
          cx={yAxisX2Point}
          cy={yAxisY2Point}
          fill={axisColor}
          r={circleRadius}
          opacity={animatedAxisTickCircleOpacity}
        />
        <AnimatedLine
          x1={yAxisX1Point}
          y1={animatedYAxisHeight}
          x2={yAxisX2Point}
          y2={yAxisY2Point}
          stroke={axisColor}
          strokeWidth={axisWidth}
        />
      </G>
    );
  };

  const renderXAxisTickLabels = () => {
    return barchartData.map((item, index) => {
      const xPointXAxisTick =
        gapBetweenXAxisTicks + xAxisX1Point + gapBetweenXAxisTicks * index;
      return (
        <G key={`xAxis Ticks and Labels ${index}`}>
          <AnimatedLine
            x1={xPointXAxisTick}
            y1={xAxisY1Point}
            x2={xPointXAxisTick}
            y2={xAxisY1Point + 10}
            strokeWidth={axisWidth}
            stroke={axisColor}
            opacity={animatedAxisTickCircleOpacity}
          />
          <AnimatedSvgText
            x={xPointXAxisTick}
            y={xAxisY1Point + 10 + axisFontSize}
            fill={theme.colors.info}
            textAnchor="middle"
            fontSize={axisFontSize}
            opacity={animatedAxisTickCircleOpacity}
          >
            {item?.month}
          </AnimatedSvgText>
        </G>
      );
    });
  };

  const renderYAxisTickLabels = () => {
    return yAxisData?.map((item, index) => {
      const yPointYAxisTicks = yAxisY2Point - gapBetweenYAxisTicks * index;
      return (
        <G key={`yAxis Ticks and Labels ${index}`}>
          <AnimatedLine
            x1={yAxisX2Point}
            y1={yPointYAxisTicks}
            x2={yAxisX2Point - 10}
            y2={yPointYAxisTicks}
            stroke={axisColor}
            strokeWidth={axisWidth}
            opacity={animatedAxisTickCircleOpacity}
          />
          <AnimatedSvgText
            x={yAxisX2Point - 11}
            y={yPointYAxisTicks + axisFontSize / 3}
            fill={theme.colors.info}
            textAnchor="end"
            fontSize={axisFontSize}
            opacity={animatedAxisTickCircleOpacity}
          >
            {`${item} M`}
          </AnimatedSvgText>
        </G>
      );
    });
  };

  const renderBarchart = () => {
    const gapBetweenYAxisTicks = yAxisHeight / (yAxisData?.length - 1);

    return barchartData.map((item, index) => {
      const xPointXAxisTick =
        gapBetweenXAxisTicks + xAxisX1Point + gapBetweenXAxisTicks * index;

      if (item?.value !== 0 && gapBetweenYAxisValues !== 0) {
        let height =
          (item?.value * gapBetweenYAxisTicks) / gapBetweenYAxisValues;

        let animatedHeight = new Animated.Value(0);
        Animated.timing(animatedHeight, {
          toValue: -height,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }).start();

        return (
          <G key={`barchart ${index}`}>
            <AnimatedRect
              x={xPointXAxisTick - barWidth / 2}
              y={xAxisY1Point}
              height={animatedHeight}
              width={barWidth}
              fill={theme.colors.primaryLight}
              stroke={theme.colors.primary}
              onPress={() =>
                Alert.alert(
                  `${item?.month}: Rp ${(item?.value * 1000000)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
                )
              }
            />
          </G>
        );
      } else {
        return;
      }
    });
  };

  const renderTooltips = () => {
    const gapBetweenYAxisTicks = yAxisHeight / (yAxisData?.length - 1);

    return barchartData?.map((item, index) => {
      const xPointXAxisTick =
        gapBetweenXAxisTicks + xAxisX1Point + gapBetweenXAxisTicks * index;

      if (item?.value !== 0 && gapBetweenYAxisValues !== 0) {
        let height =
          (item?.value * gapBetweenYAxisTicks) / gapBetweenYAxisValues;
        return (
          <G key={`Tooptip ${index}`}>
            <AnimatedLine
              x1={xPointXAxisTick}
              y1={yAxisY2Point - height}
              x2={xPointXAxisTick}
              y2={yAxisY2Point - height - 10}
              strokeWidth={axisWidth}
              stroke={theme.colors.primary}
              opacity={animatedAxisTickCircleOpacity}
            />
            <AnimatedSvgText
              x={xPointXAxisTick}
              y={yAxisY2Point - height - 10 - 5}
              fontSize={axisFontSize}
              fill={theme.colors.primary}
              textAnchor="middle"
              opacity={animatedAxisTickCircleOpacity}
            >
              {`${(item?.value / 1000000).toFixed(2)} M`}
            </AnimatedSvgText>
          </G>
        );
      } else {
        return;
      }
    });
  };

  return (
    <Box width={canvasWidth} height={canvasHeight}>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { width: marginLeftForYAxis + circleRadius, zIndex: 1 },
        ]}
      >
        <AnimatedSvg
          height="100%"
          width="100%"
          style={{ backgroundColor: theme.colors.background }}
        >
          {yAxisData?.length > 0 && renderYAxis()}
          {yAxisData?.length > 0 && renderYAxisTickLabels()}
        </AnimatedSvg>
      </View>
      <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ height: canvasHeight, width: xAxisWidth }}>
          <AnimatedSvg
            height="100%"
            width="100%"
            style={{ backgroundColor: "transparent" }}
          >
            {yAxisData?.length > 0 && renderXAxis()}
            {yAxisData?.length > 0 && renderXAxisTickLabels()}
            {yAxisData?.length > 0 && renderBarchart()}
            {showTooltip && yAxisData?.length > 0 && renderTooltips()}
          </AnimatedSvg>
        </View>
      </ScrollView>
    </Box>
  );
};

export default Barchart;
