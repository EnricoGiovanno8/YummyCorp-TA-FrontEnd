import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AuthContext, { CheckoutContext, CartContext } from "../../../context";
import { Box, Button, palette, Text, useTheme } from "../../components";
import AddCard from "./AddCard";
import Card from "./Card";
import { CARD_HEIGHT } from "./CardLayout";

interface CheckoutProps {
  minHeight: number;
  onEnd: boolean;
  onAddCreditCard: () => void;
  onSuccessfulPayment: () => void;
}

interface LineItemProps {
  label: string;
  value: number;
}

const LineItem = ({ label, value }: LineItemProps) => {
  return (
    <Box flexDirection="row" paddingVertical="s">
      <Box flex={1}>
        <Text variant="title3" color="background">
          {label}
        </Text>
      </Box>
      <Box>
        <Text variant="title3" color="primary">
          Rp {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </Text>
      </Box>
    </Box>
  );
};

const Checkout = ({
  minHeight,
  onEnd,
  onAddCreditCard,
  onSuccessfulPayment,
}: CheckoutProps) => {
  const { cart, getUserCart } = useContext(CartContext);
  const { cards, isLoading, onPayRequest } = useContext(CheckoutContext);
  const { user, updateUser } = useContext(AuthContext);
  const theme = useTheme();
  const [onEditAddress, setOnEditAddress] = useState(false);
  const [onChangeAddress, setOnChangeAddress] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const getTotalItems = () => {
    if (cart.length > 0) {
      return cart.reduce((a, b) => a + b.quantity, 0);
    } else {
      return 0;
    }
  };

  const getTotalPriceItem = () => {
    if (cart.length > 0) {
      return cart.reduce((a, b) => a + b.quantity * b.productStock.price, 0);
    } else {
      return 0;
    }
  };

  const onSaveAddress = async () => {
    if (onChangeAddress) {
      const body = {
        address: onChangeAddress,
      };
      await updateUser(body);
    }
    setOnChangeAddress("");
    setOnEditAddress(false);
  };

  const onPay = async () => {
    if (cart.length > 0 && user.address && selectedCard) {
      const success = await onPayRequest({
        cardToken: selectedCard,
        totalPrice: getTotalPriceItem() + 10000,
        totalItems: getTotalItems(),
      });
      if (success === "PAYMENT SUCCESS") {
        onSuccessfulPayment();
        await getUserCart();
      }
    }
  };

  return (
    <Box flex={1} backgroundColor="secondary" style={{ paddingTop: minHeight }}>
      <Box flex={1} padding="m">
        <Box height={CARD_HEIGHT}>
          <ScrollView horizontal>
            <AddCard onAddCreditCard={onAddCreditCard} />
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                selected={selectedCard === card}
                onSelect={() => setSelectedCard(card)}
              />
            ))}
          </ScrollView>
        </Box>
        <Box marginTop="l">
          <Text color="background" variant="title3" marginBottom="s">
            Delivery Address
          </Text>
          <Box flexDirection="row" paddingVertical="s">
            <Box flex={1}>
              {onEditAddress ? (
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  defaultValue={user ? user.address : null}
                  onChangeText={(text) => setOnChangeAddress(text)}
                  style={{
                    color: palette.navy,
                    backgroundColor: "#f0f0f0",
                    padding: theme.spacing.s,
                    // @ts-ignore
                    borderRadius: theme.borderRadii.m,
                    textAlign: "justify",
                  }}
                />
              ) : (
                <Text color="background" style={{ fontSize: 14, opacity: 0.5 }}>
                  {user ? user.address : null}
                </Text>
              )}
            </Box>
            <Box paddingLeft="m" justifyContent="center" alignItems="center">
              {onEditAddress ? (
                <Box flex={1} justifyContent="space-around">
                  <TouchableOpacity onPress={() => onSaveAddress()}>
                    <Box
                      backgroundColor="primary"
                      style={{ paddingHorizontal: 5 }}
                      // @ts-ignore
                      borderRadius="m"
                    >
                      <Text
                        color="background"
                        style={{
                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        Save
                      </Text>
                    </Box>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setOnEditAddress(false)}>
                    <Box
                      backgroundColor="danger"
                      style={{ paddingHorizontal: 5 }}
                      // @ts-ignore
                      borderRadius="m"
                    >
                      <Text
                        color="background"
                        style={{
                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        Cancel
                      </Text>
                    </Box>
                  </TouchableOpacity>
                </Box>
              ) : (
                <TouchableOpacity onPress={() => setOnEditAddress(true)}>
                  <Text color="background" style={{ fontSize: 14 }}>
                    Change
                  </Text>
                </TouchableOpacity>
              )}
            </Box>
          </Box>
          <LineItem
            label={`Total Items (${getTotalItems()})`}
            value={getTotalPriceItem()}
          />
          <LineItem label="Standard Delivery" value={10000} />
          <LineItem label="Total Payment" value={getTotalPriceItem() + 10000} />
        </Box>
        {cart.length === 0 ? null : (
          <Box
            flex={1}
            paddingVertical="m"
            alignItems="center"
            justifyContent="flex-end"
          >
            {isLoading ? (
              <ActivityIndicator size={50} color={palette.green} />
            ) : (
              <Button
                label={
                  onEnd
                    ? `Click to Pay Rp ${(getTotalPriceItem() + 10000)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
                    : `Swipe to Pay Rp ${(getTotalPriceItem() + 10000)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
                }
                variant="primary"
                disabled={
                  onEnd
                    ? cart.length > 0 && user.address && selectedCard
                      ? false
                      : true
                    : true
                }
                opacity={
                  onEnd
                    ? cart.length > 0 && user.address && selectedCard
                      ? 1
                      : 0.5
                    : 0.5
                }
                onPress={onPay}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default Checkout;
