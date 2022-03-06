import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import TransactionHistoryContext from "../../../context/TransactionHistoryContext";
import { Box, Header, palette, Text } from "../../components";
import { TransactionHistoryNavigationProps } from "../../components/Navigation";
import Barchart from "./Barchart";

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

const TransactionHistory = ({
  navigation,
}: TransactionHistoryNavigationProps<"TransactionHistory">) => {
  const { histories, totalAmountOneYear, getHistories, getHistoryOneYear } =
    useContext(TransactionHistoryContext);
  const [selectedMonth, setSelectedMonth] = useState(month);

  useEffect(() => {
    (async () =>
      navigation.addListener("focus", async () => {
        await getHistories(month);
        await getHistoryOneYear();
      }))();
  }, []);

  const getTotalAmountAllTime = () => {
    if (totalAmountOneYear.length > 0) {
      return totalAmountOneYear
        .reduce((a: number, b: number) => a + b, 0)
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
              <Text variant="title1">Rp {getTotalAmountAllTime()}</Text>
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
          {totalAmountOneYear.length > 0 && (
            <Barchart totalAmountOneYear={totalAmountOneYear} showTooltip />
          )}
          <Box width={180} alignSelf="flex-end">
            <Picker
              style={{
                borderWidth: 1,
                color: palette.green,
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
          </Box>
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
