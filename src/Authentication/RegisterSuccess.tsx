import React from "react";
import { AuthNavigationProps } from "../components/Navigation";
import {
  Box,
  Button,
  Container,
  Text,
  RoundedIconButton,
  RoundedIcon,
} from "../components";

const SIZE = 80;

const RegisterSuccess = ({
  navigation,
}: AuthNavigationProps<"RegisterSuccess">) => {
  return (
    <Container
      pattern={0}
      footer={
        <Box flexDirection="row" justifyContent="center">
          <RoundedIconButton
            name="x"
            size={60}
            backgroundColor="background"
            color="secondary"
            onPress={() => navigation.goBack()}
          />
        </Box>
      }
    >
      <Box flex={1} justifyContent="center" alignItems="center" padding="xl">
        <RoundedIcon
          name="check"
          size={SIZE}
          backgroundColor="primaryLight"
          color="primary"
        />
        <Text variant="title1" textAlign="center" marginVertical="l">
          Your account was successfully registered
        </Text>
        <Text variant="body" textAlign="center" marginBottom="xl">
          Close this window and login
        </Text>
        <Box alignItems="center">
          <Button
            variant="primary"
            label="Login"
            onPress={() => navigation.navigate("Login")}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterSuccess;
