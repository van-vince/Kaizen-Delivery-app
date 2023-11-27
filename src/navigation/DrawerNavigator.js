import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeStack } from "./StackNavigators";
import { Icon } from "@rneui/base";
import { colors } from "../global/styles";
import Settings from "../screens/drawerScreens/Settings";
import About from "../screens/drawerScreens/About";
import History from "../screens/drawerScreens/Profile";
import Discounts from "../screens/drawerScreens/Discounts";
import Orders from "../screens/drawerScreens/Orders";
import Support from "../screens/drawerScreens/Support";
import CustomDrawer from "./CustomDrawer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from "../screens/drawerScreens/Profile";

const Drawer = createDrawerNavigator();

export default function createNativeStacknavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "Home",
          drawerActiveBackgroundColor: '#FF8C00',
          drawerActiveTintColor: '#ffff',
          drawerIcon: ({ focussed, size }) => (
            <Ionicons
              type="material-community"
              name="home-outline"
              color={focussed ? "#7cc" : colors.grey2}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={Orders}
        options={{
          title: "Orders",
          drawerActiveBackgroundColor: '#FF8C00',
          drawerActiveTintColor: '#ffff',
          drawerIcon: ({ focussed, size }) => (
            <Ionicons
              type="material-community"
              name="cart-outline"
              color={focussed ? "#7cc" : colors.grey2}
              size={size}
            />
          ),
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          drawerActiveBackgroundColor: '#FF8C00',
          drawerActiveTintColor: '#ffff',
          drawerIcon: ({ focussed, size }) => (
            <Ionicons
              type="material-community"
              name="person-outline"
              color={focussed ? "#7cc" : colors.grey2}
              size={size}
            />
          ),
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Support"
        component={Support}
        options={{
          title: "Support",
          drawerActiveBackgroundColor: '#FF8C00',
          drawerActiveTintColor: '#ffff',
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="material-community"
              name="contacts-outline"
              color={focussed ? "#7cc" : colors.grey2}
              size={size}
            />
          ),
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          drawerActiveBackgroundColor: '#FF8C00',
          drawerActiveTintColor: '#ffff',
          drawerIcon: ({ focussed, size }) => (
            <Ionicons
              type="material-community"
              name="settings-outline"
              color={focussed ? "#7cc" : colors.grey2}
              size={size}
            />
          ),
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          title: "About",
          drawerActiveBackgroundColor: '#FF8C00',
          drawerActiveTintColor: '#ffff',
          drawerIcon: ({ focussed, size }) => (
            <Ionicons
              type="material-community"
              name="information-circle-outline"
              color={focussed ? "#7cc" : colors.grey2}
              size={size}
            />
          ),
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
}
