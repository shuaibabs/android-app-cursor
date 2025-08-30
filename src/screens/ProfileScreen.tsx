import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../App';

const ProfileScreen: React.FC = () => {
  const { isDarkMode, toggleDarkMode, theme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const menuItems = [
    {
      id: '1',
      title: 'Personal Information',
      subtitle: 'Edit your profile details',
      icon: 'person',
      onPress: () => console.log('Personal Information'),
    },
    {
      id: '2',
      title: 'Saved Addresses',
      subtitle: 'Manage your service addresses',
      icon: 'location-on',
      onPress: () => console.log('Saved Addresses'),
    },
    {
      id: '3',
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
      icon: 'credit-card',
      onPress: () => console.log('Payment Methods'),
    },
    {
      id: '4',
      title: 'Notifications',
      subtitle: 'Customize your notifications',
      icon: 'notifications',
      onPress: () => console.log('Notifications'),
      hasSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled,
    },
    {
      id: '5',
      title: 'Dark Mode',
      subtitle: 'Toggle dark theme',
      icon: 'dark-mode',
      onPress: () => console.log('Dark Mode'),
      hasSwitch: true,
      switchValue: isDarkMode,
      onSwitchChange: toggleDarkMode,
    },
    {
      id: '6',
      title: 'Language',
      subtitle: 'English (India)',
      icon: 'language',
      onPress: () => console.log('Language'),
    },
    {
      id: '7',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      icon: 'help',
      onPress: () => console.log('Help & Support'),
    },
    {
      id: '8',
      title: 'About Urban Company',
      subtitle: 'App version and information',
      icon: 'info',
      onPress: () => console.log('About Urban Company'),
    },
    {
      id: '9',
      title: 'Privacy Policy',
      subtitle: 'Read our privacy policy',
      icon: 'privacy-tip',
      onPress: () => console.log('Privacy Policy'),
    },
    {
      id: '10',
      title: 'Terms of Service',
      subtitle: 'Read our terms of service',
      icon: 'description',
      onPress: () => console.log('Terms of Service'),
    },
  ];

  const renderMenuItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: theme.cardBackground }]}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuItemIcon, { backgroundColor: isDarkMode ? '#3A3A3C' : '#FFF5F2' }]}>
          <Icon name={item.icon} size={24} color={theme.primaryColor} />
        </View>
        <View style={styles.menuItemContent}>
          <Text style={[styles.menuItemTitle, { color: theme.textPrimary }]}>{item.title}</Text>
          <Text style={[styles.menuItemSubtitle, { color: theme.textSecondary }]}>{item.subtitle}</Text>
        </View>
      </View>
      
      {item.hasSwitch ? (
        <Switch
          value={item.switchValue}
          onValueChange={item.onSwitchChange}
          trackColor={{ false: '#E5E5EA', true: theme.primaryColor }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <Icon name="chevron-right" size={24} color={theme.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Profile</Text>
          <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.cardBackground }]}>
            <Icon name="edit" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={[styles.profileSection, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitials}>UC</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.textPrimary }]}>Urban Company User</Text>
            <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>user@urbancompany.com</Text>
            <Text style={[styles.profilePhone, { color: theme.textSecondary }]}>+91 98765 43210</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={[styles.statsSection, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.primaryColor }]}>15</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Total Bookings</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.borderColor }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.primaryColor }]}>4.8</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Average Rating</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.borderColor }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.primaryColor }]}>8</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Services Used</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={[styles.menuSection, { backgroundColor: theme.cardBackground }]}>
          {menuItems.map((item) => (
            <View key={item.id}>
              {renderMenuItem({ item })}
              {item.id !== menuItems[menuItems.length - 1].id && (
                <View style={[styles.menuDivider, { backgroundColor: theme.borderColor }]} />
              )}
            </View>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.cardBackground }]}>
            <Icon name="logout" size={20} color="#FF3B30" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={[styles.versionText, { color: theme.textSecondary }]}>Urban Company v1.0.0</Text>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInitials: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 16,
  },
  statsSection: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
  },
  menuSection: {
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
  },
  menuDivider: {
    height: 1,
    marginLeft: 76,
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ProfileScreen;
