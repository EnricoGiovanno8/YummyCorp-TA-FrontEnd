import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Routes } from "../components/Navigation";
import { Box, Button, Container, Text, CloseButton } from "../components";
import { Feather as Icon } from "@expo/vector-icons";

const SIZE = 80;

const PasswordChanged = ({
  navigation,
}: StackScreenProps<Routes, "PasswordChanged">) => {
  return (
    <Container
      footer={
        <Box flexDirection="row" justifyContent="center">
          <CloseButton onPress={() => navigation.pop()} />
        </Box>
      }
    >
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box
          backgroundColor="primaryLight"
          style={{ height: SIZE, width: SIZE, borderRadius: SIZE / 2 }}
          justifyContent="center"
          alignItems="center"
          marginBottom="xl"
        >
          <Text color="primary" textAlign="center">
            <Icon name="check" size={32} />
          </Text>
        </Box>
        <Text variant="title1" textAlign="center" marginBottom="m">
          Your password was successfully changed
        </Text>
        <Text variant="body" textAlign="center" marginBottom="xl">
          Close this window and login again
        </Text>
        <Box alignItems="center">
          <Button
            variant="primary"
            label="Login again"
            onPress={() => navigation.navigate("Login")}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PasswordChanged;
