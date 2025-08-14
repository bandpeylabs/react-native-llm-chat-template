import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import ChatMessage from '@/src/components/ChatMessage';
import TypingIndicator from '@/src/components/TypingIndicator';
import SolarIcon from '@/src/components/SolarIcon';
import { ChatMessage as ChatMessageType } from '@/src/types/chat';
import { useTheme, getWebSafeElevation } from '@/src/hooks/useTheme';

export default function ChatScreen() {
  const theme = useTheme();
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${userMessage.text}". This is a template response. In a real app, you would integrate with an actual AI service here.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const renderMessage = ({ item }: { item: ChatMessageType }) => (
    <ChatMessage message={item} />
  );

  const hasInputText = inputText.trim() !== '';

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={[
            styles.messagesContent,
            { paddingHorizontal: theme.spacing.md },
          ]}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        />

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.colors.surface,
              borderTopColor: theme.colors.divider,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
            },
          ]}
        >
          {/* Add Image Button */}
          <TouchableOpacity
            style={[
              styles.addImageButton,
              {
                backgroundColor: theme.colors.surfaceVariant,
                borderRadius: theme.borderRadius.full,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: theme.spacing.sm,
              },
            ]}
            onPress={() => {
              // TODO: Implement image picker
              console.log('Add image pressed');
            }}
          >
            <SolarIcon
              name="image"
              size={20}
              color={theme.colors.text.secondary}
            />
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.colors.surfaceVariant,
                borderRadius: theme.borderRadius.full,
                color: theme.colors.text.primary,
                fontSize: theme.typography.body1.fontSize,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                flex: 1,
                marginRight: theme.spacing.sm,
              },
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask anything..."
            placeholderTextColor={theme.colors.text.secondary}
            multiline
            maxLength={1000}
          />

          {/* Send/Microphone Button */}
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: hasInputText
                  ? theme.colors.primary
                  : theme.colors.surfaceVariant,
                borderRadius: theme.borderRadius.full,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={
              hasInputText
                ? sendMessage
                : () => {
                    // TODO: Implement voice recording
                    console.log('Voice recording pressed');
                  }
            }
          >
            <SolarIcon
              name={hasInputText ? 'send' : 'microphone'}
              size={20}
              color={
                hasInputText
                  ? theme.colors.text.inverse
                  : theme.colors.text.secondary
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
  },
  addImageButton: {
    // Styles applied inline for theme integration
  },
  textInput: {
    maxHeight: 100,
  },
  sendButton: {
    // Styles applied inline for theme integration
  },
});
