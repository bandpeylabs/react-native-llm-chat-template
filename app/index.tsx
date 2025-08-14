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
  Modal,
} from 'react-native';
import ChatMessage from '@/src/components/ChatMessage';
import TypingIndicator from '@/src/components/TypingIndicator';
import { IconSymbol } from '@/components/ui/IconSymbol';
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
  const [selectedModel, setSelectedModel] = useState('llama');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [modelButtonLayout, setModelButtonLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const flatListRef = useRef<FlatList>(null);

  const models = [
    { id: 'llama', name: 'Llama', description: "Meta's Llama model" },
    { id: 'gpt4', name: 'GPT-4', description: "OpenAI's GPT-4 model" },
    { id: 'gpt4o', name: 'GPT-4o', description: "OpenAI's GPT-4o model" },
    { id: 'claude', name: 'Claude', description: "Anthropic's Claude model" },
    { id: 'gemini', name: 'Gemini', description: "Google's Gemini model" },
  ];

  const currentModel = models.find((model) => model.id === selectedModel);

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
      {/* Top Panel */}
      <View
        style={[
          styles.topPanel,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.divider,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
          },
        ]}
      >
        {/* Burger Menu Button */}
        <TouchableOpacity
          style={[
            styles.burgerButton,
            {
              marginRight: theme.spacing.md,
            },
          ]}
          onPress={() => {
            // TODO: Implement left drawer menu
            console.log('Burger menu pressed');
          }}
        >
          <IconSymbol
            name="line.3.horizontal"
            size={24}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>

        {/* Model Selector */}
        <TouchableOpacity
          style={[
            styles.modelSelector,
            {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            setModelButtonLayout({ x, y, width, height });
          }}
          onPress={() => setShowModelDropdown(true)}
        >
          <Text
            style={[
              styles.modelText,
              {
                color: theme.colors.text.primary,
                ...theme.typography.body1,
                fontWeight: '500',
              },
            ]}
          >
            Model {currentModel?.name}
          </Text>
          <IconSymbol
            name="chevron.right"
            size={16}
            color={theme.colors.text.secondary}
            style={{ marginLeft: theme.spacing.xs }}
          />
        </TouchableOpacity>
      </View>

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
            <IconSymbol
              name="photo.fill"
              size={20}
              color={theme.colors.text.secondary}
            />
          </TouchableOpacity>

          {/* Text Input Container with Button Inside */}
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: theme.colors.surfaceVariant,
                borderRadius: theme.borderRadius.full,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
              },
            ]}
          >
            <TextInput
              style={[
                styles.textInput,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.body1.fontSize,
                  flex: 1,
                  textAlignVertical: 'center',
                  paddingVertical: 0,
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

            {/* Send/Microphone Button Inside Input */}
            <TouchableOpacity
              style={[
                styles.sendButton,
                {
                  backgroundColor: hasInputText
                    ? theme.colors.primary
                    : 'transparent',
                  borderRadius: theme.borderRadius.full,
                  width: 32,
                  height: 32,
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
              <IconSymbol
                name={hasInputText ? 'paperplane.fill' : 'mic.fill'}
                size={18}
                color={
                  hasInputText
                    ? theme.colors.text.inverse
                    : theme.colors.text.secondary
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Model Selection Modal */}
      <Modal
        visible={showModelDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModelDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModelDropdown(false)}
        >
          <View
            style={[
              styles.modelDropdown,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                ...getWebSafeElevation(theme.elevation.lg),
                position: 'absolute',
                top: modelButtonLayout.y + modelButtonLayout.height + 8,
                left: modelButtonLayout.x,
                right: modelButtonLayout.x + modelButtonLayout.width,
                maxWidth: 300,
                minWidth: modelButtonLayout.width,
              },
            ]}
          >
            {models.map((model, index) => (
              <TouchableOpacity
                key={model.id}
                style={[
                  styles.modelOption,
                  {
                    paddingVertical: theme.spacing.md,
                    paddingHorizontal: theme.spacing.lg,
                    borderBottomWidth: index === models.length - 1 ? 0 : 1,
                    borderBottomColor: theme.colors.divider,
                  },
                  model.id === selectedModel && {
                    backgroundColor: theme.colors.primary + '10',
                  },
                ]}
                onPress={() => {
                  setSelectedModel(model.id);
                  setShowModelDropdown(false);
                }}
              >
                <View style={styles.modelOptionContent}>
                  <Text
                    style={[
                      styles.modelOptionName,
                      {
                        color: theme.colors.text.primary,
                        ...theme.typography.body1,
                        fontWeight: model.id === selectedModel ? '600' : '400',
                      },
                    ]}
                  >
                    {model.name}
                  </Text>
                  <Text
                    style={[
                      styles.modelOptionDescription,
                      {
                        color: theme.colors.text.secondary,
                        ...theme.typography.caption,
                        marginTop: theme.spacing.xs,
                      },
                    ]}
                  >
                    {model.description}
                  </Text>
                </View>
                {model.id === selectedModel && (
                  <IconSymbol
                    name="checkmark"
                    size={20}
                    color={theme.colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  burgerButton: {
    // Styles applied inline for theme integration
  },
  modelSelector: {
    // Styles applied inline for theme integration
  },
  modelText: {
    // Styles applied inline for theme integration
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
  inputWrapper: {
    // Styles applied inline for theme integration
  },
  textInput: {
    maxHeight: 100,
  },
  sendButton: {
    // Styles applied inline for theme integration
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modelDropdown: {
    // Position and size are now set inline for dynamic positioning
  },
  modelOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modelOptionContent: {
    flex: 1,
  },
  modelOptionName: {
    // Styles applied inline for theme integration
  },
  modelOptionDescription: {
    // Styles applied inline for theme integration
  },
});
