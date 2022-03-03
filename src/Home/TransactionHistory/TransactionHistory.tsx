import React, { useContext } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import TransactionHistoryContext from "../../../context/TransactionHistoryContext";
import { Box, Header, makeStyles, Text } from "../../components";
import { TransactionHistoryNavigationProps } from "../../components/Navigation";
import { Theme } from "../../components/Theme";

import Graph, { DataPoint } from "./Graph";
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
    color: "graph1",
    id: 245673,
  },
  {
    date: new Date("2020-02-01").getTime(),
    value: 198.54,
    color: "graph2",
    id: 245674,
  },
  {
    date: new Date("2019-10-02").getTime(),
    value: 139.42,
    color: "primary",
    id: 245675,
  },
  {
    date: new Date("2019-12-01").getTime(),
    value: 281.23,
    color: "graph1",
    id: 245676,
  },
  {
    date: new Date("2020-02-01").getTime(),
    value: 198.54,
    color: "graph2",
    id: 245677,
  },
];

const TransactionHistory = ({
  navigation,
}: TransactionHistoryNavigationProps<"TransactionHistory">) => {
  const { histories } = useContext(TransactionHistoryContext)
  console.log(histories)

  const styles = useStyles();

  return (
    <Box flex={1}>
      <Box flex={1} backgroundColor="background">
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
          >
            {data.map((transaction) => (
              <Transaction key={transaction.id} transaction={transaction} navigation={navigation} />
            ))}
          </ScrollView>
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionHistory;
