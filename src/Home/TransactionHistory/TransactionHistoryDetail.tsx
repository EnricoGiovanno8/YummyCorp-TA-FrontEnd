import moment from "moment";
import React from "react";
import { Image, ScrollView } from "react-native";
import { URL } from "../../../context";
import { Box, Header, RoundedIcon, Text } from "../../components";
import { TransactionHistoryNavigationProps } from "../../components/Navigation";

const TransactionHistoryDetail = ({
  navigation,
  route,
}: TransactionHistoryNavigationProps<"TransactionHistoryDetail">) => {
  const { order } = route.params;
  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Transaction Detail"
        left={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
        }}
      />
      <Box flex={1} padding="m">
        <Box
          flex={1}
          backgroundColor="background"
          // @ts-ignore
          borderRadius="l"
          style={{
            elevation: 5,
            shadowColor: "black",
          }}
          padding="l"
        >
          <Box>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <RoundedIcon
                name="check"
                size={40}
                backgroundColor="primaryLight"
                color="primary"
              />
              <Text variant="title2" marginLeft="m" color="primary">
                Order Confirmed
              </Text>
            </Box>
            <Box marginVertical="m" alignSelf="center">
              <Text variant="body">Order Number: {order.orderNumber}</Text>
              <Text variant="body">
                Order Date: {moment(order.createdAt).format("ddd, DD MMM YYYY")}
              </Text>
              <Text variant="body">Delivery Fee: {"Rp 10.000"}</Text>
              <Text variant="body" fontFamily="SFProDisplay-Semibold">
                Total Amount:{" "}
                {`Rp ${order.totalAmount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} (${
                  order.totalItems
                } Items)`}
              </Text>
            </Box>
          </Box>
          <Text variant="title3" color="primary">
            Your Order:
          </Text>
          <Box
          flex={1}
            marginTop="s"
            backgroundColor="background"
            // @ts-ignore
            borderRadius="m"
            overflow="hidden"
            borderWidth={1}
            borderColor="primary"
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {order.orderItems.map((oI: any, index: number) => (
                <Box
                  key={oI.id}
                  borderBottomWidth={
                    index === order.orderItems.length - 1 ? 0 : 1
                  }
                  borderColor="primary"
                  padding="s"
                  flexDirection="row"
                >
                  <Box
                    height={100}
                    width={100}
                    backgroundColor="primary"
                    marginRight="m"
                    // @ts-ignore
                    borderRadius="s"
                    overflow="hidden"
                    alignSelf="center"
                  >
                    <Image
                      source={{
                        uri: `${URL}/product-image/${oI.product.image}`,
                      }}
                      style={{
                        resizeMode: "cover",
                        height: "100%",
                      }}
                    />
                  </Box>
                  <Box flex={1} justifyContent="center">
                    <Text variant="body" fontFamily="SFProDisplay-Semibold">
                      {oI.product.name}
                    </Text>
                    <Text variant="body" fontSize={11}>
                      Size: {oI.size.name}
                    </Text>
                    <Text variant="body" fontSize={11}>
                      Price:{" "}
                      {`Rp ${oI.productStock.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} x ${
                        oI.quantity
                      }`}
                    </Text>
                    <Text variant="body" fontSize={11}>
                      Total:{" "}
                      {`Rp ${(oI.productStock.price * oI.quantity)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                    </Text>
                  </Box>
                </Box>
              ))}
            </ScrollView>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionHistoryDetail;
