import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Box, Text } from "../../components";
import { TransactionHistoryRoutes } from "../../components/Navigation";
import { DataPoint } from "./Graph";

interface TransactionProps {
  transaction: DataPoint;
  navigation: StackNavigationProp<
    TransactionHistoryRoutes,
    "TransactionHistory"
  >;
}

const Transaction = ({ transaction, navigation }: TransactionProps) => {
  return (
    <Box
      marginTop="l"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Box flexDirection="row" alignItems="center" marginBottom="s">
          <Box
            backgroundColor={transaction.color}
            marginRight="s"
            style={{ width: 10, height: 10, borderRadius: 5 }}
          />
          <Text variant="title3">{`#${transaction.id}`}</Text>
        </Box>
        <Text color="info">{`${transaction.value} - ${moment(
          transaction.date
        ).format("DD MMMM, YYYY")}`}</Text>
      </Box>
      <TouchableOpacity onPress={() => navigation.navigate("TransactionHistoryDetail")}>
        <Box backgroundColor="primary">
          <Text color="secondary" variant="button">
            See more
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default Transaction;
