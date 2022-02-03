import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { AuthenticationRoutes } from "../components/Navigation";
import { Box, Button, Container, Text, RoundedIconButton, RoundedIcon } from "../components";

const SIZE = 80;

const PasswordChanged = ({
  navigation,
}: StackScreenProps<AuthenticationRoutes, "PasswordChanged">) => {
  return (
    <Container
      pattern={0}
      footer={
        <Box flexDirection="row" justifyContent="center">
          <RoundedIconButton
            name="x"
            size={60}
            backgroundColor="white"
            color="secondary"
            onPress={() => navigation.pop()}
          />
        </Box>
      }
    >
      <Box flex={1} justifyContent="center" alignItems="center" padding="xl">
        <RoundedIcon name="check" size={SIZE} backgroundColor="primaryLight" color="primary" />
        <Text variant="title1" textAlign="center" marginVertical="l">
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
