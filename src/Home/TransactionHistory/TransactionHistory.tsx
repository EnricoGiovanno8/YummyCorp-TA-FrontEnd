import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet } from "react-native";
import { Box, Header, makeStyles, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { Theme } from "../../components/Theme";

import Graph, { DataPoint } from "./Graph";
import TopCurve from "./TopCurve";
import Transaction from "./Transaction";

const footerHeight = (Dimensions.get("window").width / 3) * 0.8;
const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    // @ts-ignore: Object is possibly 'undefined'.
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  scrollView: {
    paddingBottom: footerHeight,
  },
}));

const startDate = new Date("2019-09-01").getTime();
const maxDate = new Date("2020-03-01").getTime();
const numberOfMonths = new Date(maxDate - startDate).getMonth();

const data: DataPoint[] = [
  {
    date: new Date("2019-10-02").getTime(),
    value: 139.42,
    color: "primary",
    id: 245672,
  },
  {
    date: new Date("2019-12-01").getTime(),
    value: 281.23,
    color: "orange",
    id: 245673,
  },
  {
    date: new Date("2020-02-01").getTime(),
    value: 198.54,
    color: "yellow",
    id: 245674,
  },
];

const TransactionHistory = ({
  navigation,
}: HomeNavigationProps<"TransactionHistory">) => {
  const styles = useStyles();
  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="Transaction History"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "share", onPress: () => true }}
      />
      <Box padding="m" flex={1}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Text variant="header" color="secondary" opacity={0.3}>
              TOTAL SPENT
            </Text>
            <Text variant="title1">$619,19</Text>
          </Box>
          <Box
            backgroundColor="primaryLight"
            // @ts-ignore: Object is possibly 'undefined'.
            borderRadius="xl"
            padding="sm"
          >
            <Text color="primary">All Time</Text>
          </Box>
        </Box>
        <Graph
          data={data}
          startDate={startDate}
          numberOfMonths={numberOfMonths}
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          {data.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ScrollView>
      </Box>
      <TopCurve footerHeight={footerHeight} />
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        height={footerHeight}
      >
        <Image
          style={styles.footer}
          source={require("../OutfitIdeas/assets/background.jpg")}
        />
      </Box>
    </Box>
  );
};

export default TransactionHistory;
