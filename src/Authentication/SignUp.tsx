import React, { useContext, useEffect, useRef } from "react";
import { ActivityIndicator, TextInput as RNTextInput } from "react-native";
import Footer from "./components/Footer";
import { Box, Button, Container, Text, palette } from "../components";
import TextInput from "./components/Form/TextInput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AuthNavigationProps } from "../components/Navigation";
import AuthContext from "../../context";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string()
    .min(2, "Password has to be 2 characters minimum!")
    .max(50, "Password Too Long!")
    .required("Password Required"),
  passwordConfirmation: Yup.string()
    .equals([Yup.ref("password")], "Password don't match")
    .required("Pasword Confirmation Required"),
});

const SignUp = ({ navigation }: AuthNavigationProps<"SignUp">) => {
  const { errorRegister, isLoading, clearErrorRegister, register } =
    useContext(AuthContext);

  useEffect(() => {
    clearErrorRegister();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (data: any) => {
    const user = await register(data);

    if (user) {
      navigation.navigate("RegisterSuccess");
    }
  };

  const password = useRef<RNTextInput>(null);
  const passwordConfirmation = useRef<RNTextInput>(null);

  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => navigation.navigate("Login")}
    />
  );

  return (
    <Container pattern={1} {...{ footer }}>
      <Box padding="xl" justifyContent="center" flex={1}>
        <Text variant="title1" textAlign="center" marginBottom="l">
          Create account
        </Text>
        <Text variant="body" textAlign="center" marginBottom="l">
          Let us know what's your name, email, and your password
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
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => passwordConfirmation.current?.focus()}
                secureTextEntry
              />
            )}
            name="password"
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
                ref={passwordConfirmation}
                icon="lock"
                placeholder="Confirm your password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.passwordConfirmation ? true : false}
                touched={touchedFields.passwordConfirmation}
                autoCompleteType="password"
                autoCapitalize="none"
                returnKeyType="go"
                returnKeyLabel="go"
                onSubmitEditing={handleSubmit(onSubmit)}
                secureTextEntry
              />
            )}
            name="passwordConfirmation"
          />
        </Box>
        {errors.email || errors.password || errors.passwordConfirmation ? (
          <Box alignItems="center">
            {errors.email ? (
              <Text variant="error">{errors.email.message}</Text>
            ) : errors.password ? (
              <Text variant="error">{errors.password.message}</Text>
            ) : errors.passwordConfirmation ? (
              <Text variant="error">{errors.passwordConfirmation.message}</Text>
            ) : null}
          </Box>
        ) : null}
        {errorRegister ? (
          <Box alignItems="center">
            <Text variant="error">{errorRegister}</Text>
          </Box>
        ) : null}
        <Box alignItems="center" marginTop="m">
          {isLoading ? (
            <ActivityIndicator size={50} color={palette.green} />
          ) : (
            <Button
              variant="primary"
              label="Create your account"
              onPress={handleSubmit(onSubmit)}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
