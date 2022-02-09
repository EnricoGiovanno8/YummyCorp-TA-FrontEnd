import React from "react";
import { Dimensions } from "react-native";
import { Box, useTheme } from "../../../components";
import { Theme } from "../../../components/Theme";
import { lerp } from "./Scale";
import Underlay, { MARGIN } from "./Underlay";

const { width: wWidth } = Dimensions.get("window");
const aspectRatio = 195 / 305;

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
  const dates = data.map((p) => p.date);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);

  return (
    <Box marginTop="xl" paddingLeft={MARGIN} paddingBottom={MARGIN}>
      <Underlay
        minY={minY}
        maxY={maxY}
        startDate={startDate}
        numberOfMonths={numberOfMonths}
        step={step}
      />
      <Box {...{ width, height }}>
        {data.map((point) => {
          const i = new Date(point.date - startDate).getMonth();
          return (
            <Box
              key={point.id}
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={lerp(0, height, point.value / maxY)}
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
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Graph;
