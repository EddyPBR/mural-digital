import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Billboard from "./screens/Billboard";
import Announce from "./screens/Announce";

const Routes: React.FC = () => {
  const AppStack = createStackNavigator();

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Billboard" component={Billboard} />
        <AppStack.Screen name="Announce" component={Announce} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
