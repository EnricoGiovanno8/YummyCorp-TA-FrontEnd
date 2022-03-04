import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface AppNavigationProps<RouteName extends keyof AppRoutes> {
  navigation: StackNavigationProp<AppRoutes, RouteName>;
  route: RouteProp<AppRoutes, RouteName>;
}

export interface AuthNavigationProps<
  RouteName extends keyof AuthenticationRoutes
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticationRoutes, RouteName>,
    DrawerNavigationProp<AppRoutes, "Home">
  >;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: DrawerNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
}

export interface ProductNavigationProps<RouteName extends keyof ProductRoutes> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProductRoutes, RouteName>,
    DrawerNavigationProp<HomeRoutes>
  >;
  route: RouteProp<ProductRoutes, RouteName>;
}

export interface TransactionHistoryNavigationProps<RouteName extends keyof TransactionHistoryRoutes> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TransactionHistoryRoutes, RouteName>,
    DrawerNavigationProp<HomeRoutes>
  >;
  route: RouteProp<TransactionHistoryRoutes, RouteName>;
}

export type AppRoutes = {
  Authentication: undefined;
  Home: undefined;
};

export type AuthenticationRoutes = {
  OnBoarding: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  RegisterSuccess: undefined;
  ForgotPassword: undefined;
  PasswordChanged: undefined;
};

export type HomeRoutes = {
  ProductNavigator: NavigatorScreenParams<ProductRoutes>;
  OutfitIdeas: undefined;
  FavouriteOutfits: undefined;
  EditProfile: undefined;
  TransactionHistoryNavigator: NavigatorScreenParams<TransactionHistoryRoutes>;
  NotificationsSettings: undefined;
  Logout: undefined;
  Cart: undefined;
};

export type ProductRoutes = {
  Product: undefined;
  ProductDetail: { product: any, from: "Product" | "FavouriteOutfits" };
};

export type TransactionHistoryRoutes = {
  TransactionHistory: undefined;
  TransactionHistoryDetail: { order: any };
};