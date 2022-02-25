import React from "react";
import { Box } from "../../components";
import CardLayout from "./CardLayout";
import { Feather as Icon } from "@expo/vector-icons";

interface AddCardProps {
  onAddCreditCard: () => void;
}

const AddCard = ({ onAddCreditCard }: AddCardProps) => {
  return (
    <CardLayout onPress={() => onAddCreditCard()} backgroundColor="secondary">
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        // @ts-ignore
        borderRadius="m"
        style={{ backgroundColor: "rgba(255,255,255, 0.05)" }}
      >
        <Icon name="plus" color="white" size={32} />
      </Box>
    </CardLayout>
  );
};

export default AddCard;
