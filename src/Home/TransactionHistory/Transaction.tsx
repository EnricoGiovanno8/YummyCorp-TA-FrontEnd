import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Box, Text } from "../../components";
import { TransactionHistoryRoutes } from "../../components/Navigation";

interface TransactionProps {
  order: any;
  navigation: StackNavigationProp<
    TransactionHistoryRoutes,
    "TransactionHistory"
  >;
}

const Transaction = ({ order, navigation }: TransactionProps) => {
  return (
    <Box
      marginBottom="l"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Box flexDirection="row" alignItems="center" marginBottom="s">
          <Box
            backgroundColor="primary"
            marginRight="s"
            style={{ width: 10, height: 10, borderRadius: 5 }}
          />
          <Text variant="title3">{`#${order.orderNumber}`}</Text>
        </Box>
        <Text color="info">{`Rp ${order.totalAmount.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} - ${moment(
          order.createdAt
        ).format("DD MMMM, YYYY")}`}</Text>
      </Box>
      <TouchableOpacity
        onPress={() => navigation.navigate("TransactionHistoryDetail", { order: order })}
      >
        <Box
          backgroundColor="background"
          padding="s"
          // @ts-ignore
          borderRadius="m"
          borderWidth={1}
          borderColor="primary"
        >
          <Text color="primary" variant="button">
            See more
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default Transaction;
