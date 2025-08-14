import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function TypingIndicator() {
  const theme = useTheme();

  return (
    <View style={styles.messageContainer}>
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            ...theme.elevation.sm,
          },
        ]}
      >
        <View style={styles.typingIndicator}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.typingDot,
                {
                  backgroundColor: theme.colors.text.secondary,
                  opacity: 0.6 + index * 0.2,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 4,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
});
