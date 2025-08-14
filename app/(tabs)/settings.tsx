import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import SolarIcon from '@/src/components/SolarIcon';
import { useTheme } from '@/src/hooks/useTheme';

export default function SettingsScreen() {
  const theme = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          title: 'Push Notifications',
          subtitle: 'Receive notifications for new messages',
          type: 'switch',
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
          icon: 'notification',
        },
        {
          title: 'Dark Mode',
          subtitle: 'Use dark theme throughout the app',
          type: 'switch',
          value: darkModeEnabled,
          onValueChange: setDarkModeEnabled,
          icon: 'moon',
        },
        {
          title: 'Auto Save',
          subtitle: 'Automatically save chat history',
          type: 'switch',
          value: autoSaveEnabled,
          onValueChange: setAutoSaveEnabled,
          icon: 'save',
        },
        {
          title: 'Location Services',
          subtitle: 'Allow access to your location',
          type: 'switch',
          value: locationEnabled,
          onValueChange: setLocationEnabled,
          icon: 'location',
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          title: 'Profile',
          subtitle: 'Edit your profile information',
          type: 'navigate',
          icon: 'user',
          onPress: () => Alert.alert('Profile', 'Profile editing coming soon!'),
        },
        {
          title: 'Privacy',
          subtitle: 'Manage your privacy settings',
          type: 'navigate',
          icon: 'shield',
          onPress: () =>
            Alert.alert('Privacy', 'Privacy settings coming soon!'),
        },
        {
          title: 'Security',
          subtitle: 'Change password and security settings',
          type: 'navigate',
          icon: 'lock',
          onPress: () =>
            Alert.alert('Security', 'Security settings coming soon!'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help & FAQ',
          subtitle: 'Get help and find answers',
          type: 'navigate',
          icon: 'help',
          onPress: () => Alert.alert('Help', 'Help section coming soon!'),
        },
        {
          title: 'Contact Support',
          subtitle: 'Get in touch with our team',
          type: 'navigate',
          icon: 'mail',
          onPress: () => Alert.alert('Contact', 'Contact support coming soon!'),
        },
        {
          title: 'About',
          subtitle: 'App version and information',
          type: 'navigate',
          icon: 'info',
          onPress: () =>
            Alert.alert(
              'About',
              'React Native LLM Chat Template v1.0.0\n\nBuilt with ❤️ by Bandpey GmbH'
            ),
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.settingItem,
        {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.divider,
        },
      ]}
      onPress={item.type === 'navigate' ? item.onPress : undefined}
      disabled={item.type === 'switch'}
    >
      <View style={styles.settingItemLeft}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: theme.colors.surfaceVariant,
              borderRadius: theme.borderRadius.full,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: theme.spacing.md,
            },
          ]}
        >
          <SolarIcon
            name={item.icon}
            size={20}
            color={theme.colors.primary}
          />
        </View>
        <View style={styles.settingText}>
          <Text
            style={[
              styles.settingTitle,
              {
                color: theme.colors.text.primary,
                ...theme.typography.body1,
                marginBottom: theme.spacing.xs,
              },
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.settingSubtitle,
              {
                color: theme.colors.text.secondary,
                ...theme.typography.body2,
              },
            ]}
          >
            {item.subtitle}
          </Text>
        </View>
      </View>

      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.onValueChange}
          trackColor={{
            false: theme.colors.text.disabled,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.text.inverse}
        />
      ) : (
        <SolarIcon
          name="chevron-right"
          size={20}
          color={theme.colors.text.secondary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, sectionIndex) => (
          <View
            key={sectionIndex}
            style={styles.section}
          >
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: theme.colors.text.secondary,
                  ...theme.typography.caption,
                  marginBottom: theme.spacing.sm,
                  marginLeft: theme.spacing.md,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                },
              ]}
            >
              {section.title}
            </Text>
            <View
              style={[
                styles.sectionContent,
                {
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.borderRadius.lg,
                  marginHorizontal: theme.spacing.md,
                  overflow: 'hidden',
                  ...theme.elevation.sm,
                },
              ]}
            >
              {section.items.map((item, itemIndex) =>
                renderSettingItem(item, itemIndex)
              )}
            </View>
          </View>
        ))}

        <View
          style={[
            styles.footer,
            {
              paddingVertical: theme.spacing.xl,
              paddingHorizontal: theme.spacing.md,
            },
          ]}
        >
          <Text
            style={[
              styles.footerText,
              {
                color: theme.colors.text.secondary,
                ...theme.typography.body2,
                marginBottom: theme.spacing.xs,
              },
            ]}
          >
            React Native LLM Chat Template
          </Text>
          <Text
            style={[
              styles.footerVersion,
              {
                color: theme.colors.text.disabled,
                ...theme.typography.caption,
              },
            ]}
          >
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    // Styles applied inline for theme integration
  },
  sectionContent: {
    // Styles applied inline for theme integration
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    // Styles applied inline for theme integration
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    // Styles applied inline for theme integration
  },
  settingSubtitle: {
    // Styles applied inline for theme integration
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    // Styles applied inline for theme integration
  },
  footerVersion: {
    // Styles applied inline for theme integration
  },
});
