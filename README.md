# AI Chat Template

A modern, cross-platform React Native chat application template with Material Design and AI model integration. Built with Expo Router, TypeScript, and a beautiful Material Design system.

## 🚀 Features

### **Modern Chat Interface**

- **ChatGPT-like UI** with beautiful message bubbles
- **Material Design** with custom color palette
- **Dark/Light mode** support with automatic switching
- **Smooth animations** and transitions
- **Typing indicators** for realistic chat experience

### **Smart Input System**

- **Dynamic input field** with "Ask anything..." placeholder
- **Image attachment button** (round button on the left)
- **Smart send/microphone button** that changes based on input state
- **Voice recording ready** (microphone icon when empty)
- **Send button** with primary blue color when typing

### **AI Model Integration**

- **Model selector** in top panel with dropdown menu
- **Multiple AI models** support:
  - Llama (Meta)
  - GPT-4 (OpenAI)
  - GPT-4o (OpenAI)
  - Claude (Anthropic)
  - Gemini (Google)
- **Easy model switching** with visual feedback

### **Navigation & UI**

- **Burger menu** ready for left drawer implementation
- **Top panel** with model selection
- **Clean, focused design** without bottom navigation
- **Responsive layout** for all screen sizes

## 🎨 Design System

### **Custom Color Palette**

```css
Primary: #078DEE (Blue)
Secondary: #8E33FF (Purple)
Success: #22C55E (Green)
Warning: #FFAB00 (Orange)
Error: #FF5630 (Red)
```

### **Material Design Components**

- **Typography scale** with proper font weights
- **Spacing system** based on 8px grid
- **Border radius** with Material Design values
- **Elevation system** with web-safe shadows
- **Theme-aware colors** for light/dark modes

## 📱 Screenshots

_Screenshots coming soon_

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo Router** - File-based routing and navigation
- **TypeScript** - Type-safe development
- **Material Design** - Modern UI/UX principles
- **Solar Icons** - Beautiful icon system
- **Expo** - Development platform and tools

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** - `npm install -g @expo/cli`

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/react-native-llm-chat-template.git
   cd react-native-llm-chat-template
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   - **iOS Simulator**: Press `i` or run `npm run ios`
   - **Android Emulator**: Press `a` or run `npm run android`
   - **Web Browser**: Press `w` or run `npm run web`
   - **Physical Device**: Scan QR code with Expo Go app

## 📁 Project Structure

```
react-native-llm-chat-template/
├── app/                          # Expo Router pages
│   ├── index.tsx                # Main chat interface
│   └── _layout.tsx              # Root layout configuration
├── src/                         # Source code
│   ├── components/              # Reusable UI components
│   │   ├── ChatMessage.tsx     # Message bubble component
│   │   ├── TypingIndicator.tsx # Typing animation
│   │   └── SolarIcon.tsx       # Icon component
│   ├── constants/               # App constants
│   │   └── theme.ts            # Material Design theme system
│   ├── hooks/                   # Custom React hooks
│   │   └── useTheme.ts         # Theme management hook
│   └── types/                   # TypeScript type definitions
│       └── chat.ts             # Chat-related types
├── assets/                      # Static assets
├── app.json                     # Expo configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🎯 Key Components

### **Chat Interface (`app/index.tsx`)**

- Main chat screen with message list
- Smart input system with dynamic buttons
- Model selector in top panel
- Ready for AI service integration

### **Theme System (`src/constants/theme.ts`)**

- Complete Material Design implementation
- Light and dark theme support
- Custom color palette
- Typography, spacing, and elevation systems

### **Message Components**

- **ChatMessage**: Beautiful message bubbles with timestamps
- **TypingIndicator**: Animated typing dots
- **SolarIcon**: Icon system with fallback support

## 🔧 Customization

### **Adding New AI Models**

```typescript
const models = [
  { id: 'your-model', name: 'Your Model', description: 'Model description' },
  // Add more models here
];
```

### **Customizing Colors**

Edit `src/constants/theme.ts` to modify the color palette:

```typescript
export const palette = {
  primary: {
    main: '#YOUR_COLOR',
    // ... other shades
  },
  // ... other colors
};
```

### **Adding Features**

- **Image picker**: Implement in the image button
- **Voice recording**: Add to microphone button
- **AI integration**: Connect to your preferred AI service
- **Left drawer**: Implement using the burger menu

## 📦 Available Scripts

```bash
# Start development server
npm start

# Run on specific platforms
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web Browser

# Build for production
npm run build

# Lint code
npm run lint
```

## 🌐 Platform Support

- ✅ **iOS** - Full support with native performance
- ✅ **Android** - Full support with Material Design
- ✅ **Web** - Responsive web interface
- ✅ **Expo Go** - Development and testing

## 🔮 Future Enhancements

- [ ] **Left drawer navigation** with settings and history
- [ ] **Image picker integration** for photo sharing
- [ ] **Voice recording** with speech-to-text
- [ ] **Real AI service integration** (OpenAI, Anthropic, etc.)
- [ ] **Message history** and conversation management
- [ ] **User authentication** and profiles
- [ ] **Push notifications** for new messages
- [ ] **Offline support** with local storage

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the custom license - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React Native and Expo
- Material Design principles and guidelines
- Solar Icons for beautiful iconography
- Community contributions welcome

## 📞 Support

- **Documentation**: Check the code comments and this README
- **Issues**: Open an issue on GitHub for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

---

**Ready to build your next AI chat app? This template provides everything you need to get started quickly! 🚀**
