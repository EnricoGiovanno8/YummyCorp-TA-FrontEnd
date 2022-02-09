import React from "react";
import { RectButton } from "react-native-gesture-handler";
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
        <RectButton {...{ onPress }}>
          <Box flexDirection="row" justifyContent="center">
            <Text variant="button" color="background">
              {title}
            </Text>
            <Text marginLeft="s" variant="button" color="primary">
              {action}
            </Text>
          </Box>
        </RectButton>
      </Box>
    </>
  );
};

export default Footer;
