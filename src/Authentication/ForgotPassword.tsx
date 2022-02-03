import { yupResolver } from "@hookform/resolvers/yup";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Linking } from "react-native";
import { Box, Button, Container, Text } from "../components";
import { AuthenticationRoutes } from "../components/Navigation";
import Footer from "./components/Footer";
import * as Yup from "yup";
import TextInput from "./components/Form/TextInput";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = ({
  navigation,
}: StackScreenProps<AuthenticationRoutes, "ForgotPassword">) => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate("PasswordChanged");
  };

  const footer = (
    <Footer
      title="Don't work?"
      action="Try another way"
      onPress={() => Linking.openURL("mailto:help@support.com")}
    />
  );

  return (
    <Container pattern={2} {...{ footer }}>
      <Box padding="xl" justifyContent="center" flex={1}>
        <Text variant="title1" textAlign="center" marginBottom="l">
          Forgot password?
        </Text>
        <Text variant="body" textAlign="center" marginBottom="l">
          Enter the email address associated with your account
        </Text>
        <Box marginBottom="l">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                icon="mail"
                placeholder="Enter you email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.email ? true : false}
                touched={touchedFields.email}
                autoCompleteType="email"
                autoCapitalize="none"
                returnKeyType="go"
                returnKeyLabel="go"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="email"
          />
        </Box>

        <Box alignItems="center">
          <Button
            variant="primary"
            label="Reset password"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
