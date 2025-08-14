import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import SolarIcon from '@/src/components/SolarIcon';
import { useTheme } from '@/src/hooks/useTheme';

export default function HomeScreen() {
  const theme = useTheme();

  const features = [
    {
      title: 'Start New Chat',
      description: 'Begin a new conversation with AI',
      icon: 'chat-round-dots',
      href: '/(tabs)/chat',
      color: theme.colors.primary,
    },
    {
      title: 'Settings',
      description: 'Customize your experience',
      icon: 'settings',
      href: '/(tabs)/settings',
      color: theme.colors.secondary,
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text.primary,
              ...theme.typography.h2,
            },
          ]}
        >
          AI Chat Template
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: theme.colors.text.secondary,
              ...theme.typography.body1,
            },
          ]}
        >
          Your intelligent conversation companion
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <Link
            key={index}
            href={feature.href as any}
            asChild
          >
            <TouchableOpacity
              style={[
                styles.featureCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.borderRadius.lg,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.md,
                  ...theme.elevation.sm,
                },
              ]}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: feature.color,
                    borderRadius: theme.borderRadius.full,
                    width: 56,
                    height: 56,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: theme.spacing.md,
                  },
                ]}
              >
                <SolarIcon
                  name={feature.icon}
                  size={24}
                  color={theme.colors.text.inverse}
                />
              </View>
              <View style={styles.featureText}>
                <Text
                  style={[
                    styles.featureTitle,
                    {
                      color: theme.colors.text.primary,
                      ...theme.typography.h6,
                      marginBottom: theme.spacing.xs,
                    },
                  ]}
                >
                  {feature.title}
                </Text>
                <Text
                  style={[
                    styles.featureDescription,
                    {
                      color: theme.colors.text.secondary,
                      ...theme.typography.body2,
                    },
                  ]}
                >
                  {feature.description}
                </Text>
              </View>
              <SolarIcon
                name="chevron-right"
                size={20}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <View
        style={[
          styles.infoSection,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
            marginTop: theme.spacing.lg,
            marginBottom: theme.spacing.xxl,
            ...theme.elevation.sm,
          },
        ]}
      >
        <Text
          style={[
            styles.infoTitle,
            {
              color: theme.colors.text.primary,
              ...theme.typography.h5,
              marginBottom: theme.spacing.sm,
            },
          ]}
        >
          About This Template
        </Text>
        <Text
          style={[
            styles.infoText,
            {
              color: theme.colors.text.secondary,
              ...theme.typography.body1,
              lineHeight: theme.typography.body1.lineHeight,
            },
          ]}
        >
          This is a React Native template for building AI-powered chat
          applications. It includes all the necessary components and
          configurations to get you started quickly.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    // Styles applied inline for theme integration
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    // Styles applied inline for theme integration
  },
  featureDescription: {
    // Styles applied inline for theme integration
  },
  infoSection: {
    // Styles applied inline for theme integration
  },
  infoTitle: {
    // Styles applied inline for theme integration
  },
  infoText: {
    // Styles applied inline for theme integration
  },
});
