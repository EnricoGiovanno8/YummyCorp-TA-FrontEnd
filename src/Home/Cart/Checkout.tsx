import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Box, Button, Text } from "../../components";
import AddCart from "./AddCart";
import Card, { CardType, CardModel } from "./Card";
import { CARD_HEIGHT } from "./CardLayout";

interface CheckoutProps {
  minHeight: number;
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
          ${value.toFixed(2)}
        </Text>
      </Box>
    </Box>
  );
};

const Checkout = ({ minHeight }: CheckoutProps) => {
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
          <LineItem label="Total Items (6)" value={189.94} />
          <LineItem label="Standard Delivery" value={12.0} />
          <LineItem label="Total Payment" value={201.84} />
        </Box>
        <Box flex={1} paddingVertical="m" alignItems="center" justifyContent="flex-end">
          <Button
            label="Swipe to Pay $201.84"
            variant="primary"
            onPress={() => true}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Checkout;
