import React from "react";
import {  StyleSheet } from "react-native";
import { Box, Text, useTheme } from "../../../components";

export const MARGIN = "xl";
const ROW_HEIGHT = 25;

interface UnderlayProps {
  maxY: number;
  step: number;
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

const Underlay = ({ maxY, step }: UnderlayProps) => {
  const theme = useTheme();
  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box flex={1} justifyContent="space-between">
        {[1, 0.66, 0.33, 0].map((t) => {
          return (
            <Box
              key={t}
              flexDirection="row"
              alignItems="center"
              height={ROW_HEIGHT}
              style={{
                top: t === 0 ? ROW_HEIGHT / 2 : t === 1 ? -ROW_HEIGHT / 2 : 0,
              }}
            >
              <Box width={theme.spacing[MARGIN]} paddingRight="s">
                <Text color="info" textAlign="right">
                  {Math.round(maxY * t)}
                </Text>
              </Box>
              <Box flex={1} height={1} backgroundColor="background2" />
            </Box>
          );
        })}
      </Box>
      <Box
        marginLeft={MARGIN}
        height={theme.spacing[MARGIN]}
        flexDirection="row"
        alignItems="center"
      >
        {Month.map((m, index) => (
          <Box key={index} width={step}>
            <Text color="info" textAlign="center">
              {m}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Underlay;
