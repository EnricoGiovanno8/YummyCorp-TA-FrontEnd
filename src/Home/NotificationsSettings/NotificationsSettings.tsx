import React from "react";
import { Box, Header, ContentFooter } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Notification from "./Notification";

const NotificationsSettings = ({
  navigation,
}: HomeNavigationProps<"NotificationsSettings">) => {
  return (
    <ContentFooter>
      <Box backgroundColor="background">
        <Header
          left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
          right={{ icon: "share", onPress: () => true }}
          title="Notifications Settings"
        />
        <Box padding="m">
          <Notification
            title="Outfit Ideas"
            description="Receive daily notifications"
          />
          <Notification
            title="Discounts & Sales"
            description="Buy the stuff you love for less"
          />
          <Notification
            title="Stock Notifications"
            description="If the product you 💜 comes back in stock"
          />
          <Notification
            title="New Stuff"
            description="Hear it first, wear it first"
          />
        </Box>
      </Box>
    </ContentFooter>
  );
};

export default NotificationsSettings;
