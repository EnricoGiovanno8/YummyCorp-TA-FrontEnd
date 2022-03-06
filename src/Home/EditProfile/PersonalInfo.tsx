import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView } from "react-native";
import { Box, Button, palette, Text } from "../../components";
import * as Yup from "yup";
import TextInput from "../../Authentication/components/Form/TextInput";
import AuthContext from "../../../context/AuthContext";

const PersonalInfoSchema = Yup.object().shape(
  {
    name: Yup.string().notRequired(),
    password: Yup.string()
      .notRequired()
      .when("password", {
        is: (value: string) => value?.length,
        then: (rule) => rule.min(2, "Password Too Short!").max(50, "Too Long!"),
      }),
    address: Yup.string().notRequired(),
  },
  [["password", "password"]]
);

const PersonalInfo = () => {
  const { user, isLoading, updateUser } = useContext(AuthContext);

  const [isMale, setIsMale] = useState<boolean>(false);
  const [isFemale, setIsFemale] = useState<boolean>(false);

  useEffect(() => {
    if (user?.gender === "Male") {
      setIsMale(true);
    } else if (user?.gender === "Female") {
      setIsFemale(true);
    }
  }, [user]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
      address: "",
    },
    resolver: yupResolver(PersonalInfoSchema),
  });

  const onSubmit = async (data: any) => {
    const { name, password, address } = data;
    const gender =
      isMale && isFemale
        ? "Both"
        : isMale
        ? "Male"
        : isFemale
        ? "Female"
        : "Both";

    let body = {};
    if (name) {
      body = {
        ...body,
        name,
      };
    }
    if (password) {
      body = {
        ...body,
        password,
      };
    }
    if (address) {
      body = {
        ...body,
        address,
      };
    }
    body = {
      ...body,
      gender,
    };

    await updateUser(body);
  };
  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body">Account Information</Text>
        <Box marginVertical="m">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                icon="user"
                placeholder={user?.name}
                autoCapitalize="none"
                autoCompleteType="name"
                onChangeText={onChange}
                onBlur={onBlur}
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
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                icon="lock"
                placeholder="********"
                autoCapitalize="none"
                autoCompleteType="password"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="password"
          />
        </Box>
        <Box marginBottom="s">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                multiline={true}
                numberOfLines={3}
                icon="map-pin"
                placeholder={user?.address}
                autoCapitalize="none"
                autoCompleteType="street-address"
                style={{ textAlign: "justify" }}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="address"
          />
        </Box>
        <Box flexDirection="row" flexWrap="wrap" marginTop="s">
          <Button
            key="Male"
            variant={isMale ? "primary" : "default"}
            onPress={() => {
              setIsMale(!isMale);
            }}
            label="Male"
            style={{
              width: "auto",
              height: "auto",
              padding: 16,
              marginRight: 8,
            }}
          />
          <Button
            key="Female"
            variant={isFemale ? "primary" : "default"}
            onPress={() => {
              setIsFemale(!isFemale);
            }}
            label="Female"
            style={{
              width: "auto",
              height: "auto",
              padding: 16,
              marginRight: 8,
            }}
          />
        </Box>
      </Box>
      {errors.name || errors.password || errors.address ? (
        <Box alignItems="center" marginBottom="m">
          {errors.name ? (
            <Text variant="error">{errors.name.message}</Text>
          ) : errors.password ? (
            <Text variant="error">{errors.password.message}</Text>
          ) : errors.address ? (
            <Text variant="error">{errors.address.message}</Text>
          ) : null}
        </Box>
      ) : null}
      <Box marginHorizontal="m">
        {isLoading ? (
          <ActivityIndicator size={50} color={palette.green} />
        ) : (
          <Button
            variant="primary"
            style={{ width: "100%" }}
            label="Save Changes"
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </Box>
    </ScrollView>
  );
};

export default PersonalInfo;
