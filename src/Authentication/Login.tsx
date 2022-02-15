import React, { useContext, useEffect, useRef } from "react";
import { TextInput as RNTextInput } from "react-native";
import Footer from "./components/Footer";
import { Box, Button, Container, Text } from "../components";
import Checkbox from "./components/Form/Checkbox";
import TextInput from "./components/Form/TextInput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AuthNavigationProps } from "../components/Navigation";
import { RectButton } from "react-native-gesture-handler";
import AuthContext from "../../context";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  password: Yup.string()
    .min(2, "Password has to be 2 characters minimum")
    .max(50, "Password Too Long!")
    .required("Password Required"),
});

const Login = ({ navigation }: AuthNavigationProps<"Login">) => {
  const { login, error } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    resolver: yupResolver(LoginSchema),
  });

  useEffect(() => {
    (async () => {
      const emailRememberMe = await AsyncStorage.getItem("remember");

      if (emailRememberMe) {
        setValue("email", emailRememberMe);
        setValue("remember", true);
      }
    })();
  }, []);

  const onSubmit = async (data: any) => {
    const user = await login(data);

    if (user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    }
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
                touched={value ? true : touchedFields.email}
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
        {errors.email || errors.password ? (
          <Box alignItems="center" marginBottom="m">
            {errors.email ? (
              <Text variant="error">{errors.email.message}</Text>
            ) : errors.password ? (
              <Text variant="error">{errors.password.message}</Text>
            ) : null}
          </Box>
        ) : null}
        {error ? (
          <Box alignItems="center" marginBottom="m">
            <Text variant="error">{error}</Text>
          </Box>
        ) : null}
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
