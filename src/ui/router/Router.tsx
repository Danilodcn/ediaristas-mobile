import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationTheme } from "ui/themes/app-theme";

import EncontrarDiaristas from "pages/encontrar_diaristas";
import Index from "pages/Index";

const Stack = createStackNavigator();

const Router: React.FC = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen
          name="EncontrarDiaristas"
          component={EncontrarDiaristas}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
