import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ConversationListScreen from '../../Screens/Messages/ConversationListScreen';
import ConversationScreen from '../../Screens/Messages/ConversationScreen';

const Stack = createStackNavigator();

export default function MessagesStack() {
  return (
    <Stack.Navigator initialRouteName="ConversationList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ConversationList" component={ConversationListScreen} options={{ title: 'Messages' }} />
      <Stack.Screen name="Conversation" component={ConversationScreen} options={{ title: 'Conversation' }} />
    </Stack.Navigator>
  );
}
