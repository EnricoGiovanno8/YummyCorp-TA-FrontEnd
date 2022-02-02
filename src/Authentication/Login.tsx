import React, { useRef } from "react";
import { TextInput as RNTextInput, ToastAndroid } from "react-native";
import Footer from "./components/Footer";
import { Box, Button, Container, Text } from "../components";
import Checkbox from "./components/Form/Checkbox";
import TextInput from "./components/Form/TextInput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { StackScreenProps } from "@react-navigation/stack";
import { Routes } from "../components/Navigation";
import { RectButton } from "react-native-gesture-handler";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = ({ navigation, route }: StackScreenProps<Routes, "Login">) => {
  let toastMessage;
  if (route.params) {
    toastMessage = route.params.toastMessage;
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data)
    navigation.navigate("Home")
  };

  const password = useRef<RNTextInput>(null);

  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  );

  return (
    <Container pattern={0} {...{ footer }}>
      <Box padding="xl" justifyContent="center" flex={1}>
        {toastMessage &&
          ToastAndroid.showWithGravity(
            toastMessage,
            ToastAndroid.LONG,
            ToastAndroid.TOP
          )}
        <Text variant="title1" textAlign="center" marginBottom="l">
          Welcome back
        </Text>
        <Text variant="body" textAlign="center" marginBottom="l">
          Use your credentials below and login to your account
        </Text>
        <Box marginBottom="m">
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
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => password.current?.focus()}
              />
            )}
            name="email"
          />
        </Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={password}
                icon="lock"
                placeholder="Enter you password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.password ? true : false}
                touched={touchedFields.password}
                autoCompleteType="password"
                autoCapitalize="none"
                returnKeyType="go"
                returnKeyLabel="go"
                onSubmitEditing={handleSubmit(onSubmit)}
                secureTextEntry
              />
            )}
            name="password"
          />
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="m"
          alignItems="center"
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value } }) => (
              <Checkbox
                label="Remember me"
                value={value}
                onChange={(v: boolean) => setValue("remember", v)}
              />
            )}
            name="remember"
          />
          <RectButton onPress={() => navigation.navigate("ForgotPassword")}>
            <Text variant="button" color="primary">
              Forgot password
            </Text>
          </RectButton>
        </Box>
        <Box alignItems="center">
          <Button
            variant="primary"
            label="Log into your account"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
