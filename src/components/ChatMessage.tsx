import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { useTheme, getWebSafeElevation } from '../hooks/useTheme';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const theme = useTheme();
  const isUser = message.sender === 'user';

  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: isUser
              ? theme.colors.primary
              : theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            ...getWebSafeElevation(theme.elevation.sm),
          },
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            {
              color: isUser
                ? theme.colors.text.inverse
                : theme.colors.text.primary,
              ...theme.typography.body1,
            },
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            {
              color: isUser
                ? theme.colors.text.inverse + '80' // 50% opacity
                : theme.colors.text.secondary,
              ...theme.typography.caption,
            },
          ]}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    marginBottom: 4,
  },
  timestamp: {
    alignSelf: 'flex-end',
  },
});
