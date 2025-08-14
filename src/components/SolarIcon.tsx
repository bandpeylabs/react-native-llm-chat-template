import React from 'react';
import { Ionicons } from '@expo/vector-icons';

// Solar icon mapping to Ionicons (as a fallback)
// You can replace these with actual Solar icon Unicode values
const solarIconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  // Chat icons
  'chat-round-dots': 'chatbubbles-outline',
  'chat-square-dots': 'chatbubble-outline',
  'chat-round': 'chatbubbles-outline',
  'chat-square': 'chatbubble-outline',

  // Navigation icons
  'home': 'home-outline',
  'home-2': 'home-outline',
  'settings': 'settings-outline',
  'settings-2': 'settings-outline',

  // Action icons
  'send': 'send-outline',
  'send-2': 'send-outline',
  'plus': 'add-outline',
  'minus': 'remove-outline',
  'close': 'close-outline',
  'close-circle': 'close-circle-outline',

  // Status icons
  'check': 'checkmark-outline',
  'check-circle': 'checkmark-circle-outline',
  'warning': 'warning-outline',
  'error': 'close-circle-outline',
  'info': 'information-circle-outline',

  // User icons
  'user': 'person-outline',
  'user-circle': 'person-circle-outline',

  // Media icons
  'image': 'image-outline',
  'camera': 'camera-outline',
  'microphone': 'mic-outline',
  'video': 'videocam-outline',

  // File icons
  'document': 'document-outline',
  'folder': 'folder-outline',
  'download': 'download-outline',
  'upload': 'cloud-upload-outline',

  // Communication icons
  'phone': 'call-outline',
  'mail': 'mail-outline',
  'notification': 'notifications-outline',

  // UI icons
  'menu': 'menu-outline',
  'search': 'search-outline',
  'filter': 'filter-outline',
  'sort': 'swap-vertical-outline',
  'refresh': 'refresh-outline',
  'share': 'share-outline',
  'bookmark': 'bookmark-outline',
  'heart': 'heart-outline',
  'star': 'star-outline',

  // Default fallback
  'default': 'help-outline',
};

interface SolarIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

export default function SolarIcon({
  name,
  size = 24,
  color = '#000',
  style,
}: SolarIconProps) {
  const iconName = solarIconMap[name] || solarIconMap['default'];

  return (
    <Ionicons
      name={iconName}
      size={size}
      color={color}
      style={style}
    />
  );
}
