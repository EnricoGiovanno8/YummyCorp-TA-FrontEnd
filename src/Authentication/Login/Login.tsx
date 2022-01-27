import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Box, Button, Container, Text } from "../../components";
import Checkbox from "../components/Form/Checkbox";
import TextInput from "../components/Form/TextInput";
import SocialLogin from "../components/SocialLogin";

const { height } = Dimensions.get("screen");

const Login = () => {
  const emailValidator = (email: string) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  };

  const passwordValidator = (password: string) => {
    return password.length >= 6;
  };

  const footer = (
    <>
      <SocialLogin />
      <Box alignItems="center">
        <Button variant="transparent" onPress={() => alert("SIGNUP")}>
          <Box flexDirection="row" justifyContent="center">
            <Text variant="button" color="white">
              Don't have an account?
            </Text>
            <Text marginLeft="s" variant="button" color="primary">
              Sign Up Here
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  );
  return (
    <ScrollView>
      <View style={{ backgroundColor: "red", height: height - 50 }}>
        <Container {...{ footer }}>
          <Box padding="xl">
            <Text variant="title1" textAlign="center" marginBottom="l">
              Welcome back
            </Text>
            <Text variant="body" textAlign="center" marginBottom="l">
              Use your credentials below and login to your account
            </Text>
            <Box marginBottom="m">
              <TextInput
                icon="mail"
                placeholder="Enter you email"
                validator={emailValidator}
              />
            </Box>
            <Box marginBottom="m">
              <TextInput
                icon="lock"
                placeholder="Enter you password"
                validator={passwordValidator}
              />
            </Box>
            <Box flexDirection="row" justifyContent="space-between" marginBottom="m">
              <Checkbox label="Remember me" />
              <Button
                variant="transparent"
                onPress={() => alert("FORGOT PASSWORD")}
              >
                <Text color="primary">Forgot password</Text>
              </Button>
            </Box>
            <Box alignItems="center" >
              <Button
                variant="primary"
                label="Log into your account"
                onPress={() => alert("LOGIN")}
              />
            </Box>
          </Box>
        </Container>
      </View>
    </ScrollView>
  );
};

export default Login;
