import React, { useState, useRef, useEffect } from 'react';
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
  StatusBar,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatMessage from '@/src/components/ChatMessage';
import TypingIndicator from '@/src/components/TypingIndicator';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ChatMessage as ChatMessageType } from '@/src/types/chat';
import {
  useTheme,
  useIsDarkMode,
  getWebSafeElevation,
} from '@/src/hooks/useTheme';

export default function ChatScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt5');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [modelButtonLayout, setModelButtonLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const flatListRef = useRef<FlatList>(null);
  const drawerAnimation = useRef(new Animated.Value(-300)).current;
  const moreOptionsAnimation = useRef(new Animated.Value(0)).current;

  const models = [
    { id: 'gpt4', name: 'GPT-4', description: "OpenAI's GPT-4 model" },
    { id: 'gpt4o', name: 'GPT-4o', description: "OpenAI's GPT-4o model" },
    { id: 'claude', name: 'Claude', description: "Anthropic's Claude model" },
    { id: 'gemini', name: 'Gemini', description: "Google's Gemini model" },
  ];

  const currentModel = models.find((model) => model.id === selectedModel);

  const hasInputText = inputText.trim() !== '';

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
    setShowChat(true);
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

  // Drawer animation effects
  useEffect(() => {
    if (showDrawer) {
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(drawerAnimation, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showDrawer, drawerAnimation]);

  // More options animation effects
  useEffect(() => {
    if (showMoreOptions) {
      Animated.timing(moreOptionsAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(moreOptionsAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [showMoreOptions, moreOptionsAnimation]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={useIsDarkMode() ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.surface}
        translucent={true}
      />
      {/* Top Panel */}
      <View
        style={[
          styles.topPanel,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.divider,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            paddingTop: insets.top + theme.spacing.sm,
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
          onPress={() => setShowDrawer(true)}
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
        {/* Conditional Content: Suggestions or Chat */}
        {!showChat ? (
          <View style={styles.centeredContent}>
            <Text
              style={[
                styles.mainPrompt,
                {
                  color: theme.colors.text.primary,
                  ...theme.typography.h3,
                  fontWeight: '700',
                  textAlign: 'center',
                  marginBottom: theme.spacing.xl * 2,
                },
              ]}
            >
              What can I help with?
            </Text>

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              {/* First Row */}
              <View style={styles.actionButtonRow}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: theme.colors.surfaceVariant,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <IconSymbol
                    name="photo.fill"
                    size={20}
                    color={theme.colors.text.secondary}
                  />
                  <Text
                    style={[
                      styles.actionButtonText,
                      {
                        color: theme.colors.text.primary,
                        ...theme.typography.body2,
                        fontWeight: '500',
                      },
                    ]}
                  >
                    Create image
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: theme.colors.surfaceVariant,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <IconSymbol
                    name="chevron.left.forwardslash.chevron.right"
                    size={20}
                    color={theme.colors.text.secondary}
                  />
                  <Text
                    style={[
                      styles.actionButtonText,
                      {
                        color: theme.colors.text.primary,
                        ...theme.typography.body2,
                        fontWeight: '500',
                      },
                    ]}
                  >
                    Code
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Second Row */}
              <View style={styles.actionButtonRow}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: theme.colors.surfaceVariant,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <IconSymbol
                    name="graduationcap"
                    size={20}
                    color={theme.colors.text.secondary}
                  />
                  <Text
                    style={[
                      styles.actionButtonText,
                      {
                        color: theme.colors.text.primary,
                        ...theme.typography.body2,
                        fontWeight: '500',
                      },
                    ]}
                  >
                    Get advice
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: theme.colors.surfaceVariant,
                      borderColor: theme.colors.divider,
                    },
                  ]}
                >
                  <IconSymbol
                    name="eye"
                    size={20}
                    color={theme.colors.text.secondary}
                  />
                  <Text
                    style={[
                      styles.actionButtonText,
                      {
                        color: theme.colors.text.primary,
                        ...theme.typography.body2,
                        fontWeight: '500',
                      },
                    ]}
                  >
                    Analyze images
                  </Text>
                </TouchableOpacity>
              </View>

              {/* More Button - Only show when options are collapsed */}
              {!showMoreOptions && (
                <View style={styles.actionButtonRow}>
                  <TouchableOpacity
                    style={[
                      styles.moreButton,
                      {
                        borderColor: theme.colors.divider,
                      },
                    ]}
                    onPress={() => setShowMoreOptions(true)}
                  >
                    <Text
                      style={[
                        styles.moreButtonText,
                        {
                          color: theme.colors.text.secondary,
                          ...theme.typography.body2,
                          fontWeight: '500',
                        },
                      ]}
                    >
                      More
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Expanded More Options */}
              <Animated.View
                style={[
                  styles.expandedMoreOptions,
                  {
                    opacity: moreOptionsAnimation,
                    maxHeight: moreOptionsAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 400],
                    }),
                    transform: [
                      {
                        translateY: moreOptionsAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {/* Row 3 */}
                <View style={styles.actionButtonRow}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      {
                        backgroundColor: theme.colors.surfaceVariant,
                        borderColor: theme.colors.divider,
                      },
                    ]}
                  >
                    <IconSymbol
                      name="doc.text"
                      size={20}
                      color={theme.colors.text.secondary}
                    />
                    <Text
                      style={[
                        styles.actionButtonText,
                        {
                          color: theme.colors.text.primary,
                          ...theme.typography.body2,
                          fontWeight: '500',
                        },
                      ]}
                    >
                      Summarize text
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      {
                        backgroundColor: theme.colors.surfaceVariant,
                        borderColor: theme.colors.divider,
                      },
                    ]}
                  >
                    <IconSymbol
                      name="chart.bar"
                      size={20}
                      color={theme.colors.text.secondary}
                    />
                    <Text
                      style={[
                        styles.actionButtonText,
                        {
                          color: theme.colors.text.primary,
                          ...theme.typography.body2,
                          fontWeight: '500',
                        },
                      ]}
                    >
                      Analyze data
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Row 4 */}
                <View style={styles.actionButtonRow}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      {
                        backgroundColor: theme.colors.surfaceVariant,
                        borderColor: theme.colors.divider,
                      },
                    ]}
                  >
                    <IconSymbol
                      name="gift"
                      size={20}
                      color={theme.colors.text.secondary}
                    />
                    <Text
                      style={[
                        styles.actionButtonText,
                        {
                          color: theme.colors.text.primary,
                          ...theme.typography.body2,
                          fontWeight: '500',
                        },
                      ]}
                    >
                      Surprise me
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      {
                        backgroundColor: theme.colors.surfaceVariant,
                        borderColor: theme.colors.divider,
                      },
                    ]}
                  >
                    <IconSymbol
                      name="pencil"
                      size={20}
                      color={theme.colors.text.secondary}
                    />
                    <Text
                      style={[
                        styles.actionButtonText,
                        {
                          color: theme.colors.text.primary,
                          ...theme.typography.body2,
                          fontWeight: '500',
                        },
                      ]}
                    >
                      Help me write
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Row 5 */}
                <View style={styles.actionButtonRowLast}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      {
                        backgroundColor: theme.colors.surfaceVariant,
                        borderColor: theme.colors.divider,
                      },
                    ]}
                  >
                    <IconSymbol
                      name="lightbulb"
                      size={20}
                      color={theme.colors.text.secondary}
                    />
                    <Text
                      style={[
                        styles.actionButtonText,
                        {
                          color: theme.colors.text.primary,
                          ...theme.typography.body2,
                          fontWeight: '500',
                        },
                      ]}
                    >
                      Brainstorm
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      {
                        backgroundColor: theme.colors.surfaceVariant,
                        borderColor: theme.colors.divider,
                      },
                    ]}
                  >
                    <IconSymbol
                      name="list.bullet"
                      size={20}
                      color={theme.colors.text.secondary}
                    />
                    <Text
                      style={[
                        styles.actionButtonText,
                        {
                          color: theme.colors.text.primary,
                          ...theme.typography.body2,
                          fontWeight: '500',
                        },
                      ]}
                    >
                      Make a plan
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </View>
        ) : (
          <View style={styles.chatContainer}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={({ item }) => <ChatMessage message={item} />}
              keyExtractor={(item) => item.id}
              style={styles.messagesList}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
            />
            {isTyping && <TypingIndicator />}
          </View>
        )}

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.colors.surface,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.md,
              paddingBottom: theme.spacing.lg,
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
                alignSelf: 'flex-end',
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
          <Animated.View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: theme.colors.surfaceVariant,
                borderRadius: inputText.includes('\n') ? 16 : 50,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: theme.spacing.md,
                paddingVertical: inputText.includes('\n')
                  ? theme.spacing.sm
                  : 6,
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
                  textAlignVertical: inputText ? 'top' : 'center',
                  paddingVertical: 0,
                  marginRight: theme.spacing.sm,
                  minHeight: inputText.includes('\n') ? 40 : 20,
                  maxHeight: inputText.includes('\n') ? 100 : 20,
                },
              ]}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask anything..."
              placeholderTextColor={theme.colors.text.secondary}
              multiline
              maxLength={1000}
              numberOfLines={5}
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
              onPress={() => {
                if (hasInputText) {
                  sendMessage();
                } else {
                  // TODO: Implement voice recording
                  console.log('Voice recording pressed');
                }
              }}
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
          </Animated.View>
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

      {/* Drawer Menu */}
      {showDrawer && (
        <View style={styles.drawerOverlay}>
          <TouchableOpacity
            style={styles.drawerBackground}
            activeOpacity={1}
            onPress={() => setShowDrawer(false)}
          />
          <Animated.View
            style={[
              styles.drawer,
              {
                backgroundColor: theme.colors.surface,
                ...getWebSafeElevation(theme.elevation.xl),
                transform: [{ translateX: drawerAnimation }],
              },
            ]}
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <View
              style={[
                styles.drawerHeader,
                {
                  paddingTop: insets.top + theme.spacing.lg,
                  paddingHorizontal: theme.spacing.lg,
                  paddingBottom: theme.spacing.lg,
                  borderBottomColor: theme.colors.divider,
                },
              ]}
            >
              <View style={styles.drawerHeaderContent}>
                <Text
                  style={[
                    styles.drawerTitle,
                    {
                      color: theme.colors.text.primary,
                      ...theme.typography.h5,
                      fontWeight: '600',
                    },
                  ]}
                >
                  AI Chat
                </Text>
                <TouchableOpacity
                  style={styles.drawerCloseButton}
                  onPress={() => setShowDrawer(false)}
                >
                  <IconSymbol
                    name="xmark"
                    size={24}
                    color={theme.colors.text.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Drawer Content */}
            <View style={styles.drawerContent}>
              {/* Settings Section */}
              <View style={styles.drawerSection}>
                <Text
                  style={[
                    styles.drawerSectionTitle,
                    {
                      color: theme.colors.text.secondary,
                      ...theme.typography.caption,
                      fontWeight: '600',
                      marginBottom: theme.spacing.sm,
                    },
                  ]}
                >
                  SETTINGS
                </Text>

                <TouchableOpacity style={styles.drawerItem}>
                  <IconSymbol
                    name="gearshape"
                    size={20}
                    color={theme.colors.text.secondary}
                  />
                  <Text
                    style={[
                      styles.drawerItemText,
                      {
                        color: theme.colors.text.primary,
                        ...theme.typography.body1,
                        marginLeft: theme.spacing.md,
                      },
                    ]}
                  >
                    Settings
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drawerItem}>
                  <IconSymbol
                    name="paintbrush"
                    size={20}
                    color={theme.colors.text.secondary}
                  />
                  <Text
                    style={[
                      styles.drawerItemText,
                      {
                        color: theme.colors.text.primary,
                        ...theme.typography.body1,
                        marginLeft: theme.spacing.md,
                      },
                    ]}
                  >
                    Theme
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Chat Section */}
              <View style={styles.drawerSection}>
                <Text
                  style={[
                    styles.drawerSectionTitle,
                    {
                      color: theme.colors.text.secondary,
                      ...theme.typography.caption,
                      fontWeight: '600',
                      marginBottom: theme.spacing.sm,
                    },
                  ]}
                >
                  CHAT
                </Text>

                <TouchableOpacity style={styles.drawerItem}>
                  <IconSymbol
                    name="clock.arrow.circlepath"
                    size={20}
                    color={theme.colors.text.secondary}
                  />
                  <Text
                    style={[
                      styles.drawerItemText,
                      {
                        color: theme.colors.text.primary,
                        ...theme.typography.body1,
                        marginLeft: theme.spacing.md,
                      },
                    ]}
                  >
                    Chat History
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drawerItem}>
                  <IconSymbol
                    name="trash"
                    size={20}
                    color={theme.colors.text.secondary}
                  />
                  <Text
                    style={[
                      styles.drawerItemText,
                      {
                        color: theme.colors.text.primary,
                        ...theme.typography.body1,
                        marginLeft: theme.spacing.md,
                      },
                    ]}
                  >
                    Clear Chat
                  </Text>
                </TouchableOpacity>
              </View>

              {/* About Section */}
              <View style={styles.drawerSection}>
                <Text
                  style={[
                    styles.drawerSectionTitle,
                    {
                      color: theme.colors.text.secondary,
                      ...theme.typography.caption,
                      fontWeight: '600',
                      marginBottom: theme.spacing.sm,
                    },
                  ]}
                >
                  ABOUT
                </Text>

                <TouchableOpacity style={styles.drawerItem}>
                  <IconSymbol
                    name="info.circle"
                    size={20}
                    color={theme.colors.text.secondary}
                  />
                  <Text
                    style={[
                      styles.drawerItemText,
                      {
                        color: theme.colors.text.primary,
                        ...theme.typography.body1,
                        marginLeft: theme.spacing.md,
                      },
                    ]}
                  >
                    About
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drawerItem}>
                  <IconSymbol
                    name="questionmark.circle"
                    size={20}
                    color={theme.colors.text.secondary}
                  />
                  <Text
                    style={[
                      styles.drawerItemText,
                      {
                        color: theme.colors.text.primary,
                        ...theme.typography.body1,
                        marginLeft: theme.spacing.md,
                      },
                    ]}
                  >
                    Help & Support
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
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
  },
  addImageButton: {
    // Styles applied inline for theme integration
  },
  inputWrapper: {
    // Styles applied inline for theme integration
  },
  textInput: {
    // Height constraints set inline for dynamic behavior
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
  // Drawer styles
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  drawerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    height: '100%',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  drawerHeader: {
    borderBottomWidth: 1,
  },
  drawerHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawerTitle: {
    // Styles applied inline for theme integration
  },
  drawerCloseButton: {
    padding: 8,
  },
  drawerContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  drawerSection: {
    marginBottom: 24,
  },
  drawerSectionTitle: {
    // Styles applied inline for theme integration
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  drawerItemText: {
    // Styles applied inline for theme integration
  },
  // Centered content styles
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  mainPrompt: {
    // Styles applied inline for theme integration
  },
  actionButtonsContainer: {
    alignItems: 'center',
    width: '100%',
  },
  actionButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 50,
    borderWidth: 1,
    minWidth: 120,
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonText: {
    // Styles applied inline for theme integration
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: 'dashed',
    minWidth: 120,
    justifyContent: 'center',
  },
  moreButtonText: {
    // Styles applied inline for theme integration
  },
  // Chat styles
  chatContainer: {
    flex: 1,
  },
  // Expanded more options styles
  expandedMoreOptions: {
    overflow: 'hidden',
    marginTop: 0,
  },
  // Last row in expanded options should have no bottom margin
  actionButtonRowLast: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
    gap: 16,
  },
});
