import React, { useContext } from "react";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { AppRoutes, AuthenticationRoutes } from "../components/Navigation";
import OnBoarding, { assets as onBoardingAssets } from "./OnBoarding";
import Welcome, { assets as welcomeAssets } from "./Welcome";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import PasswordChanged from "./PasswordChanged";
import RegisterSuccess from "./RegisterSuccess";
import AuthContext from "../../context";
import { CommonActions } from "@react-navigation/native";

export const assets = [...onBoardingAssets, ...welcomeAssets];

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();

export const AuthenticationNavigator = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    console.log("ADA USER HARUS KE HOME")
    // return navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: "Home" }],
    //   })
    // );
  }
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="OnBoarding" component={OnBoarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="RegisterSuccess"
        component={RegisterSuccess}
      />
      <AuthenticationStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <AuthenticationStack.Screen
        name="PasswordChanged"
        component={PasswordChanged}
      />
    </AuthenticationStack.Navigator>
  );
};
