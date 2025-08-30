import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/Card';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const serviceCategories = [
    { id: '1', title: 'Insta Help', subtitle: 'Househelp in 15 minutes', icon: '⚡', color: '#FF6B35' },
    { id: '2', title: 'Beauty & Wellness', subtitle: 'Salon at home', icon: '💄', color: '#FF69B4' },
    { id: '3', title: 'Repairs', subtitle: 'Plumbers, Electricians', icon: '🔧', color: '#4CAF50' },
    { id: '4', title: 'Cleaning', subtitle: 'Home & Pest Control', icon: '🧹', color: '#2196F3' },
    { id: '5', title: 'Native', subtitle: 'Water Purifier Services', icon: '💧', color: '#9C27B0' },
    { id: '6', title: 'Home Decor', subtitle: 'Painting & Improvement', icon: '🎨', color: '#FF9800' },
  ];

  const popularServices = [
    { id: '1', title: 'Full Home Cleaning', subtitle: 'Starting from ₹999', rating: 4.8, bookings: '50k+' },
    { id: '2', title: 'AC Service & Repair', subtitle: 'Starting from ₹399', rating: 4.7, bookings: '25k+' },
    { id: '3', title: 'Salon at Home', subtitle: 'Starting from ₹299', rating: 4.9, bookings: '30k+' },
    { id: '4', title: 'Plumber Services', subtitle: 'Starting from ₹199', rating: 4.6, bookings: '20k+' },
  ];

  const renderServiceCategory = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <Text style={styles.categoryIconText}>{item.icon}</Text>
      </View>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <Text style={styles.categorySubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  const renderPopularService = ({ item }: { item: any }) => (
    <Card
      title={item.title}
      subtitle={item.subtitle}
      onPress={() => console.log(`Selected: ${item.title}`)}
      style={styles.serviceCard}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.userName}>Welcome to Urban Company</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color="#1C1C1E" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for services..."
              placeholderTextColor="#8E8E93"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close" size={20} color="#8E8E93" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Insta Help Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Insta Help</Text>
              <Text style={styles.bannerSubtitle}>Get househelp in 15 minutes</Text>
              <Text style={styles.bannerDetails}>4.7+ rated professionals • 20k+ happy customers</Text>
              <Button
                title="Book Now"
                onPress={() => console.log('Insta Help pressed')}
                size="small"
                variant="secondary"
                style={styles.bannerButton}
              />
            </View>
            <View style={styles.bannerIcon}>
              <Text style={styles.bannerIconText}>⚡</Text>
            </View>
          </View>
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What do you need?</Text>
          <FlatList
            data={serviceCategories}
            renderItem={renderServiceCategory}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.categoryRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Popular Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={popularServices}
            renderItem={renderPopularService}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Icon name="schedule" size={24} color="#FF6B35" />
              </View>
              <Text style={styles.quickActionText}>Book Service</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Icon name="history" size={24} color="#FF6B35" />
              </View>
              <Text style={styles.quickActionText}>My Bookings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Icon name="support-agent" size={24} color="#FF6B35" />
              </View>
              <Text style={styles.quickActionText}>Support</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '400',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  banner: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  bannerDetails: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 12,
  },
  bannerButton: {
    alignSelf: 'flex-start',
  },
  bannerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerIconText: {
    fontSize: 24,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  categoryRow: {
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryIconText: {
    fontSize: 20,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  serviceCard: {
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1C1C1E',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen;
