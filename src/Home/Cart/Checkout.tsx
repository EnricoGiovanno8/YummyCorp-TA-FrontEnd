import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { CartContext } from "../../../context";
import { Box, Button, Text } from "../../components";
import AddCart from "./AddCart";
import Card, { CardType, CardModel } from "./Card";
import { CARD_HEIGHT } from "./CardLayout";

interface CheckoutProps {
  minHeight: number;
  onEnd: boolean;
}

const cards: CardModel[] = [
  {
    id: 0,
    type: CardType.VISA,
    last4Digits: 5467,
    expiration: "05/24",
  },
  {
    id: 1,
    type: CardType.MASTERCARD,
    last4Digits: 2620,
    expiration: "05/24",
  },
];

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
          Rp {value.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </Text>
      </Box>
    </Box>
  );
};

const Checkout = ({ minHeight, onEnd }: CheckoutProps) => {
  const { cart } = useContext(CartContext);

  const getTotalItems = () => {
    if (cart.length > 0) {
      return cart.reduce((a, b) => a + b.quantity, 0);
    } else {
      return 0;
    }
  };

  const getTotalPriceItem = () => {
    if (cart.length > 0) {
      return cart.reduce((a, b) => a + (b.quantity * b.productStock.price), 0);
    } else {
      return 0;
    }
  }
  // @ts-ignore
  const [selectedCard, setSelectedCard] = useState(cards[0].id);
  return (
    <Box flex={1} backgroundColor="secondary" style={{ paddingTop: minHeight }}>
      <Box flex={1} padding="m">
        <Box height={CARD_HEIGHT}>
          <ScrollView horizontal>
            <AddCart />
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                selected={selectedCard === card.id}
                onSelect={() => setSelectedCard(card.id)}
              />
            ))}
          </ScrollView>
        </Box>
        <Box marginTop="xl">
          <Text color="background" variant="title3" marginBottom="m">
            Delivery Address
          </Text>
          <Box flexDirection="row" opacity={0.5} paddingVertical="m">
            <Box flex={1}>
              <Text color="background" style={{ fontSize: 14 }}>
                Unit 15, York Farm Business Centre, Watling St, Towcester
              </Text>
            </Box>
            <Box padding="m" justifyContent="center" alignItems="center">
              <Text color="background" style={{ fontSize: 14 }}>
                Change
              </Text>
            </Box>
          </Box>
          <LineItem label={`Total Items (${getTotalItems()})`} value={getTotalPriceItem()} />
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
            <Button
              label={onEnd ? `Click to Pay Rp ${(getTotalPriceItem() + 10000).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : `Swipe to Pay Rp ${(getTotalPriceItem() + 10000).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
              variant="primary"
              disabled={onEnd ? false : true}
              onPress={() => console.log("pay")}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default Checkout;
