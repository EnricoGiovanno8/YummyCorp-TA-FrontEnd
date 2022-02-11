import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { Box, Text } from "../../components";
import CheckboxGroup from "./CheckboxGroup";
import * as Yup from "yup";
import TextInput from "../../Authentication/components/Form/TextInput";

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const PersonalInfo = () => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
      address: "",
    },
    resolver: yupResolver(LoginSchema),
  });
  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body">Account Information</Text>
        <Box marginBottom="m">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                icon="user"
                placeholder="Name"
                autoCapitalize="none"
                autoCompleteType="name"
              />
            )}
            name="name"
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
                placeholder="Password"
                autoCapitalize="none"
                autoCompleteType="password"
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
                icon="map-pin"
                placeholder="Address"
                autoCapitalize="none"
                autoCompleteType="street-address"
              />
            )}
            name="address"
          />
        </Box>
        <CheckboxGroup options={genders} radio />
      </Box>
    </ScrollView>
  );
};

export default PersonalInfo;
