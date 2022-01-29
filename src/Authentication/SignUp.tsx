import React, { useRef } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import Footer from "./components/Footer";
import { Box, Button, Container, Text } from "../components";
import TextInput from "./components/Form/TextInput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { StackScreenProps } from "@react-navigation/stack";
import { Routes } from "../components/Navigation";

const { height } = Dimensions.get("screen");

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .equals([Yup.ref("password")], "Password don't match")
    .required("Required"),
});

const SignUp = ({ navigation }: StackScreenProps<Routes, "Login">) => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  const password = useRef<typeof TextInput>(null);
  const passwordConfirmation = useRef<typeof TextInput>(null);

  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => navigation.navigate("Login")}
    />
  );

  return (
    <ScrollView>
      <View style={{ backgroundColor: "red", height: height - 56 }}>
        <Container {...{ footer }}>
          <Box
            style={{ paddingTop: 45 }}
            paddingBottom="xl"
            paddingHorizontal="xl"
          >
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
            <Box alignItems="center" marginTop="m">
              <Button
                variant="primary"
                label="Create your account"
                onPress={handleSubmit(onSubmit)}
              />
            </Box>
          </Box>
        </Container>
      </View>
    </ScrollView>
  );
};

export default SignUp;
