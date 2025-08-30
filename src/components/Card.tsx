import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Image,
} from 'react-native';

interface CardProps {
  title: string;
  subtitle?: string;
  image?: string;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'service' | 'booking' | 'promo';
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  onPress,
  style,
  variant = 'service',
  children,
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.card, styles[variant], style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {image && (
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>📷</Text>
          </View>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
        {children}
      </View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  service: {
    padding: 16,
    minHeight: 120,
  },
  booking: {
    padding: 16,
    marginBottom: 12,
  },
  promo: {
    padding: 0,
    minHeight: 160,
  },
  imageContainer: {
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: 80,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '400',
  },
});

export default Card;
