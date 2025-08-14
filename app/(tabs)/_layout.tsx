import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import SolarIcon from '@/src/components/SolarIcon';
import { useTheme } from '@/src/hooks/useTheme';

function TabBarIcon(props: { name: string; color: string }) {
  return (
    <SolarIcon
      name={props.name}
      size={28}
      color={props.color}
      style={{ marginBottom: -3 }}
    />
  );
}

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.divider,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="home"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="chat-round-dots"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="settings"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
