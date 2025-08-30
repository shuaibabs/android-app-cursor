import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../App';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle = [styles.button, styles[size]];
    
    if (disabled) {
      return [...baseStyle, styles.disabled, { backgroundColor: theme.borderColor }];
    }

    switch (variant) {
      case 'primary':
        return [...baseStyle, { backgroundColor: theme.primaryColor }];
      case 'secondary':
        return [...baseStyle, { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.primaryColor }];
      case 'outline':
        return [...baseStyle, { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.borderColor }];
      default:
        return [...baseStyle, { backgroundColor: theme.primaryColor }];
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    if (disabled) {
      return [...baseStyle, { color: theme.textSecondary }];
    }

    switch (variant) {
      case 'primary':
        return [...baseStyle, { color: '#FFFFFF' }];
      case 'secondary':
        return [...baseStyle, { color: theme.primaryColor }];
      case 'outline':
        return [...baseStyle, { color: theme.textPrimary }];
      default:
        return [...baseStyle, { color: '#FFFFFF' }];
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? '#FFFFFF' : theme.primaryColor} 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});

export default Button;
