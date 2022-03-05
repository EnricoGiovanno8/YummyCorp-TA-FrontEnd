import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Svg, { Circle, G, Line, Rect, Text as SvgText } from "react-native-svg";
import { Box, useTheme } from "../../components";

const { width: wWidth } = Dimensions.get("window");
const aspectRatio = 195 / 305;

interface BarchartProps {
  totalAmountOneYear: number[];
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

const Barchart = ({ totalAmountOneYear }: BarchartProps) => {
  const theme = useTheme();

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

  const xAxisX1Point = marginLeftForYAxis;
  const xAxisY1Point = canvasHeight - marginBottomForXAxis;
  const xAxisX2Point = canvasWidth - paddingFromScreen;
  const xAxisY2Point = xAxisY1Point;

  const yAxisX1Point = marginLeftForYAxis;
  const yAxisY1Point = paddingFromScreen;
  const yAxisX2Point = marginLeftForYAxis;
  const yAxisY2Point = canvasHeight - marginBottomForXAxis;

  const [yAxisData, setYAxisData] = useState<string[]>([]);

  const minValue = 0;

  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    setMaxValue(
      Math.max.apply(
        Math,
        barchartData?.map((item) => item.value)
      )
    );
  }, [barchartData]);

  const gapBetweenYAxisValues = (maxValue - minValue) / 4;

  useEffect(() => {
    const newLabels = Array.from({ length: 6 }).map((_, index) =>
      (minValue + gapBetweenYAxisValues * index).toFixed(2)
    );
    setYAxisData(newLabels);
  }, [gapBetweenYAxisValues]);

  const xAxisWidth = canvasWidth - paddingFromScreen - marginLeftForYAxis;
  const gapBetweenXAxisTicks = xAxisWidth / (barchartData.length + 1);
  const yAxisHeight = canvasHeight - paddingFromScreen - marginBottomForXAxis;
  const gapBetweenYAxisTicks = yAxisHeight / (yAxisData?.length - 1);

  const renderXAxis = () => {
    return (
      <G key={"xAxis"}>
        <Circle
          cx={xAxisX1Point}
          cy={xAxisY1Point}
          fill={axisColor}
          r={circleRadius}
        />
        <Circle
          cx={xAxisX2Point}
          cy={xAxisY2Point}
          fill={axisColor}
          r={circleRadius}
        />
        <Line
          x1={xAxisX1Point}
          y1={xAxisY1Point}
          x2={xAxisX2Point}
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
        <Circle
          cx={yAxisX1Point}
          cy={yAxisY1Point}
          fill={axisColor}
          r={circleRadius}
        />
        <Line
          x1={yAxisX1Point}
          y1={yAxisY1Point}
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
          <Line
            x1={xPointXAxisTick}
            y1={xAxisY1Point}
            x2={xPointXAxisTick}
            y2={xAxisY1Point + 10}
            strokeWidth={axisWidth}
            stroke={axisColor}
          />
          <SvgText
            x={xPointXAxisTick}
            y={xAxisY1Point + 10 + axisFontSize}
            fill={theme.colors.info}
            textAnchor="middle"
            fontSize={axisFontSize}
          >
            {item?.month}
          </SvgText>
        </G>
      );
    });
  };

  const renderYAxisTickLabels = () => {
    return yAxisData?.map((item, index) => {
      const yPointYAxisTicks = yAxisY2Point - gapBetweenYAxisTicks * index;
      return (
        <G key={`yAxis Ticks and Labels ${index}`}>
          <Line
            x1={yAxisX2Point}
            y1={yPointYAxisTicks}
            x2={yAxisX2Point - 10}
            y2={yPointYAxisTicks}
            stroke={axisColor}
            strokeWidth={axisWidth}
          />
          <SvgText
            x={yAxisX2Point - 11}
            y={yPointYAxisTicks + axisFontSize / 3}
            fill={theme.colors.info}
            textAnchor="end"
            fontSize={axisFontSize}
          >
            {item}
          </SvgText>
        </G>
      );
    });
  };

  const renderBarchart = () => {
    const gapBetweenYAxisTicks = yAxisHeight / (yAxisData?.length - 1);
    return barchartData.map((item, index) => {
      const xPointXAxisTick =
        gapBetweenXAxisTicks + xAxisX1Point + gapBetweenXAxisTicks * index;
      let height = (item?.value * gapBetweenYAxisTicks) / gapBetweenYAxisValues;
      return (
        <G key={`barchart ${index}`}>
          <Rect
            x={xPointXAxisTick - barWidth / 2}
            y={xAxisY1Point}
            height={-height}
            width={barWidth}
            fill={theme.colors.primary}
          />
        </G>
      );
    });
  };

  return (
    <Box width={canvasWidth} height={canvasHeight}>
      <Svg
        height="100%"
        width="100%"
        style={{ backgroundColor: theme.colors.background }}
      >
        {renderXAxis()}
        {renderXAxisTickLabels()}
        {renderYAxis()}
        {renderYAxisTickLabels()}
        {yAxisData?.length > 0 && renderBarchart()}
      </Svg>
    </Box>
  );
};

export default Barchart;
