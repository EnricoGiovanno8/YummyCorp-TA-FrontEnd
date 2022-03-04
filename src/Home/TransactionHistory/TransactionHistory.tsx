import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import TransactionHistoryContext from "../../../context/TransactionHistoryContext";
import { Box, Header, palette, Text } from "../../components";
import { TransactionHistoryNavigationProps } from "../../components/Navigation";

import Graph, { DataPoint } from "./Graph";
import Transaction from "./Transaction";

let month = (new Date().getMonth() + 1).toString();
if (month.length === 1) {
  month = "0" + month;
}

const pickerMonth = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

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
];

const TransactionHistory = ({
  navigation,
}: TransactionHistoryNavigationProps<"TransactionHistory">) => {
  const { histories, totalAmountOneYear, getHistories } = useContext(
    TransactionHistoryContext
  );
  const [selectedMonth, setSelectedMonth] = useState(month);
  console.log(totalAmountOneYear);

  useEffect(() => {
    (async () =>
      navigation.addListener("focus", async () => {
        await getHistories(month);
      }))();
  }, []);

  const getTotalAmountThisMonth = () => {
    if (histories.length > 0) {
      return histories
        .reduce((a: number, b: any) => a + b.totalAmount, 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return 0;
    }
  };

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
              <Text variant="title1">Rp {getTotalAmountThisMonth()}</Text>
            </Box>
            <Box
              backgroundColor="primaryLight"
              // @ts-ignore: Object is possibly 'undefined'.
              borderRadius="xl"
              padding="sm"
            >
              <Text color="primary">This Month</Text>
            </Box>
          </Box>
          <Graph
            data={data}
            startDate={startDate}
            numberOfMonths={numberOfMonths}
          />
          <Picker
            style={{
              borderWidth: 1,
              color: palette.green,
              width: 180,
              alignSelf: "flex-end",
            }}
            selectedValue={selectedMonth}
            onValueChange={async (value) => {
              setSelectedMonth(value);
              await getHistories(value);
            }}
          >
            {pickerMonth.map((pM: any, index: number) => (
              <Picker.Item key={index} label={pM.label} value={pM.value} />
            ))}
          </Picker>
          <ScrollView showsVerticalScrollIndicator={false}>
            {histories.length > 0 ? (
              histories.map((order: any) => (
                <Transaction
                  key={order.id}
                  order={order}
                  navigation={navigation}
                />
              ))
            ) : (
              <Text>No Transaction Found</Text>
            )}
          </ScrollView>
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionHistory;
