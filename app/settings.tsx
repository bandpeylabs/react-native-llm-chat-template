import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme, useIsDarkMode } from '@/src/hooks/useTheme';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Minimal Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 16,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol
            name="chevron.right"
            size={24}
            color={theme.colors.text.primary}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            {
              color: theme.colors.text.primary,
              ...theme.typography.h5,
              fontWeight: '600',
            },
          ]}
        >
          Settings
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* User Account Section */}
        <View style={styles.userSection}>
          <View style={styles.userAvatar}>
            <Text
              style={[
                styles.userAvatarText,
                {
                  color: theme.colors.text.inverse,
                  ...theme.typography.h6,
                  fontWeight: '600',
                },
              ]}
            >
              RB
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text
              style={[
                styles.userName,
                {
                  color: theme.colors.text.primary,
                  ...theme.typography.h6,
                  fontWeight: '600',
                },
              ]}
            >
              Roozbeh Bandpey
            </Text>
            <Text
              style={[
                styles.userEmail,
                {
                  color: theme.colors.text.secondary,
                  ...theme.typography.body2,
                },
              ]}
            >
              roozbeh@bandpey.com
            </Text>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.settingsSection}>
          {/* Account Settings */}
          <View style={styles.sectionGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="info.circle"
                  size={20}
                  color={theme.colors.text.secondary}
                />
                <Text
                  style={[
                    styles.settingLabel,
                    {
                      color: theme.colors.text.primary,
                      ...theme.typography.body1,
                      marginLeft: 12,
                    },
                  ]}
                >
                  Email
                </Text>
              </View>
              <Text
                style={[
                  styles.settingValue,
                  {
                    color: theme.colors.text.secondary,
                    ...theme.typography.body2,
                  },
                ]}
              >
                roozbeh@bandpey.com
              </Text>
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.colors.divider },
              ]}
            />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="phone.fill"
                  size={20}
                  color={theme.colors.text.secondary}
                />
                <Text
                  style={[
                    styles.settingLabel,
                    {
                      color: theme.colors.text.primary,
                      ...theme.typography.body1,
                      marginLeft: 12,
                    },
                  ]}
                >
                  Phone number
                </Text>
              </View>
              <Text
                style={[
                  styles.settingValue,
                  {
                    color: theme.colors.text.secondary,
                    ...theme.typography.body2,
                  },
                ]}
              >
                +491715694248
              </Text>
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.colors.divider },
              ]}
            />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="plus.square"
                  size={20}
                  color={theme.colors.text.secondary}
                />
                <Text
                  style={[
                    styles.settingLabel,
                    {
                      color: theme.colors.text.primary,
                      ...theme.typography.body1,
                      marginLeft: 12,
                    },
                  ]}
                >
                  Manage Subscription
                </Text>
              </View>
              <Text
                style={[
                  styles.settingValue,
                  {
                    color: theme.colors.text.secondary,
                    ...theme.typography.body2,
                  },
                ]}
              >
                ChatGPT Team
              </Text>
            </View>
          </View>

          {/* Preferences */}
          <View style={styles.sectionGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="heart.fill"
                  size={20}
                  color={theme.colors.text.secondary}
                />
                <Text
                  style={[
                    styles.settingLabel,
                    {
                      color: theme.colors.text.primary,
                      ...theme.typography.body1,
                      marginLeft: 12,
                    },
                  ]}
                >
                  Personalization
                </Text>
              </View>
              <IconSymbol
                name="chevron.right"
                size={16}
                color={theme.colors.text.secondary}
              />
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.colors.divider },
              ]}
            />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="gearshape"
                  size={20}
                  color={theme.colors.text.secondary}
                />
                <Text
                  style={[
                    styles.settingLabel,
                    {
                      color: theme.colors.text.primary,
                      ...theme.typography.body1,
                      marginLeft: 12,
                    },
                  ]}
                >
                  Data Controls
                </Text>
              </View>
              <IconSymbol
                name="chevron.right"
                size={16}
                color={theme.colors.text.secondary}
              />
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.colors.divider },
              ]}
            />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="bell.fill"
                  size={20}
                  color={theme.colors.text.secondary}
                />
                <Text
                  style={[
                    styles.settingLabel,
                    {
                      color: theme.colors.text.primary,
                      ...theme.typography.body1,
                      marginLeft: 12,
                    },
                  ]}
                >
                  Notifications
                </Text>
              </View>
              <IconSymbol
                name="chevron.right"
                size={16}
                color={theme.colors.text.secondary}
              />
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.colors.divider },
              ]}
            />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="mic.fill"
                  size={20}
                  color={theme.colors.text.secondary}
                />
                <Text
                  style={[
                    styles.settingLabel,
                    {
                      color: theme.colors.text.primary,
                      ...theme.typography.body1,
                      marginLeft: 12,
                    },
                  ]}
                >
                  Voice
                </Text>
              </View>
              <IconSymbol
                name="chevron.right"
                size={16}
                color={theme.colors.text.secondary}
              />
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.colors.divider },
              ]}
            />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="shield.fill"
                  size={20}
                  color={theme.colors.text.secondary}
                />
                <Text
                  style={[
                    styles.settingLabel,
                    {
                      color: theme.colors.text.primary,
                      ...theme.typography.body1,
                      marginLeft: 12,
                    },
                  ]}
                >
                  Security
                </Text>
              </View>
              <IconSymbol
                name="chevron.right"
                size={16}
                color={theme.colors.text.secondary}
              />
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.colors.divider },
              ]}
            />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="info.circle"
                  size={20}
                  color={theme.colors.text.secondary}
                />
                <Text
                  style={[
                    styles.settingLabel,
                    {
                      color: theme.colors.text.primary,
                      ...theme.typography.body1,
                      marginLeft: 12,
                    },
                  ]}
                >
                  About
                </Text>
              </View>
              <IconSymbol
                name="chevron.right"
                size={16}
                color={theme.colors.text.secondary}
              />
            </View>
          </View>

          {/* Sign Out */}
          <View style={styles.sectionGroup}>
            <View
              style={[
                styles.divider,
                { backgroundColor: theme.colors.divider },
              ]}
            />
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="arrow.right.square"
                  size={20}
                  color="#FF5630"
                />
                <Text
                  style={[
                    styles.settingLabel,
                    {
                      color: '#FF5630',
                      ...theme.typography.body1,
                      marginLeft: 12,
                    },
                  ]}
                >
                  Sign out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    // Styles applied inline for theme integration
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#078DEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    // Styles applied inline for theme integration
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    // Styles applied inline for theme integration
  },
  userEmail: {
    marginTop: 4,
  },
  settingsSection: {
    marginTop: 16,
  },
  sectionGroup: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    // Styles applied inline for theme integration
  },
  settingValue: {
    // Styles applied inline for theme integration
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
});
