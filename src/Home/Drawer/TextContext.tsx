import React, { useContext } from "react";
import { Box, Text } from "../../components";
import AuthContext from "../../../context/AuthContext";

const TextContext = () => {
  const { user } = useContext(AuthContext);
  return (
    <Box marginBottom="m" style={{ marginTop: -60 }}>
      <Text variant="title1" textAlign="center">
        {user ? user.name : "User"}
      </Text>
      <Text variant="body" textAlign="center">
        {user ? user.email : "Email@mail.com"}
      </Text>
    </Box>
  );
};

export default TextContext;
