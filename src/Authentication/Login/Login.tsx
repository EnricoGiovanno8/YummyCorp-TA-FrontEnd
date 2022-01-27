import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Box, Button, Container, Text } from "../../components";
import Checkbox from "../components/Form/Checkbox";
import TextInput from "../components/Form/TextInput";
import SocialLogin from "../components/SocialLogin";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const { height } = Dimensions.get("screen");

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: any) => console.log(data);

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
                    icon="lock"
                    placeholder="Enter you password"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.password ? true : false}
                    touched={touchedFields.password}
                  />
                )}
                name="password"
              />
            </Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="m"
            >
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value } }) => (
                  <Checkbox label="Remember me" value={value} onChange={(v: boolean) => setValue("remember", v)}/>
                )}
                name="remember"
              />
              <Button
                variant="transparent"
                onPress={() => alert("FORGOT PASSWORD")}
              >
                <Text color="primary">Forgot password</Text>
              </Button>
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
      </View>
    </ScrollView>
  );
};

export default Login;
