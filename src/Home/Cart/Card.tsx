import React, { useContext } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Box, Text } from "../../components";
import CardLayout from "./CardLayout";
import { Feather as Icon } from "@expo/vector-icons";
import { CheckoutContext } from "../../../context";

export enum CardType {
  VISA = "VISA",
  MASTERCARD = "MASTERCARD",
}

export interface CardModel {
  id: number;
  number: string;
  type: CardType;
  expMonth: string;
  expYear: string;
  user: any;
}

interface CardProps {
  card: CardModel;
  selected: boolean;
  onSelect: () => void;
}

const Card = ({ card, selected, onSelect }: CardProps) => {
  const { deleteCard } = useContext(CheckoutContext)
  return (
    <CardLayout
      onPress={onSelect}
      backgroundColor={selected ? "primary" : "background"}
    >
      <View style={{ height: 20 }}>
        <Image
          style={
            card.type === CardType.VISA
              ? { width: 39, height: 13 }
              : { width: 32.5, height: 20 }
          }
          source={
            card.type === CardType.VISA
              ? require("./assets/visa.png")
              : require("./assets/mastercard.png")
          }
        />
      </View>
      <View>
        <Text
          variant="title3"
          color={selected ? "background" : "text"}
          style={{ fontSize: 12 }}
        >
          **** {card.number.slice(card.number.length - 4)}
        </Text>
      </View>
      <View>
        <Text opacity={0.5} style={{ fontSize: 12 }}>
          Expiration
        </Text>
        <Text style={{ fontSize: 12 }} color={selected ? "background" : "text"}>
          {card.expMonth}/{card.expYear}
        </Text>
      </View>
      <TouchableOpacity onPress={async () => await deleteCard(card.id)}>
        <Box
          alignItems="center"
          // @ts-ignore
          borderRadius="m"
          marginTop="s"
          backgroundColor="danger"
          style={{
            padding: 3,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.1)",
          }}
        >
          <Icon name="trash-2" size={20} color="white" />
        </Box>
      </TouchableOpacity>
    </CardLayout>
  );
};

export default Card;
