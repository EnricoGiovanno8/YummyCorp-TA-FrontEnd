import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Box, Text } from "../../components";
import SocialLogin from "./SocialLogin";

interface FooterProps {
  onPress: () => void;
  title: string;
  action: string;
}

const Footer = ({ onPress, title, action }: FooterProps) => {
  return (
    <>
      <SocialLogin />
      <Box alignItems="center" marginTop="m">
        <TouchableWithoutFeedback {...{ onPress }}>
          <Box flexDirection="row" justifyContent="center">
            <Text variant="button" color="white">
              {title}
            </Text>
            <Text marginLeft="s" variant="button" color="primary">
              {action}
            </Text>
          </Box>
        </TouchableWithoutFeedback>
      </Box>
    </>
  );
};

export default Footer;
