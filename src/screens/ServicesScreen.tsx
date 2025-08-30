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

const { width } = Dimensions.get('window');

const ServicesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Home',
    'Automotive',
    'Beauty',
    'Cleaning',
    'Repair',
  ];

  const allServices = [
    { id: '1', title: 'Plumber', subtitle: '24/7 Emergency Service', category: 'Home', icon: '🔧', rating: 4.8, price: 'From $50' },
    { id: '2', title: 'Electrician', subtitle: 'Professional Wiring', category: 'Home', icon: '⚡', rating: 4.9, price: 'From $60' },
    { id: '3', title: 'Mechanic', subtitle: 'Car Repair & Maintenance', category: 'Automotive', icon: '🚗', rating: 4.7, price: 'From $80' },
    { id: '4', title: 'Barber', subtitle: 'Haircut & Styling', category: 'Beauty', icon: '✂️', rating: 4.6, price: 'From $25' },
    { id: '5', title: 'Cleaner', subtitle: 'Home & Office Cleaning', category: 'Cleaning', icon: '🧹', rating: 4.5, price: 'From $40' },
    { id: '6', title: 'Painter', subtitle: 'Interior & Exterior', category: 'Home', icon: '🎨', rating: 4.4, price: 'From $100' },
    { id: '7', title: 'Carpenter', subtitle: 'Custom Woodwork', category: 'Home', icon: '🔨', rating: 4.3, price: 'From $70' },
    { id: '8', title: 'Gardener', subtitle: 'Landscaping & Maintenance', category: 'Home', icon: '🌱', rating: 4.2, price: 'From $45' },
    { id: '9', title: 'Towing Service', subtitle: '24/7 Roadside Assistance', category: 'Automotive', icon: '🚛', rating: 4.1, price: 'From $90' },
    { id: '10', title: 'Makeup Artist', subtitle: 'Professional Makeup', category: 'Beauty', icon: '💄', rating: 4.0, price: 'From $60' },
  ];

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCategoryButton = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item && styles.categoryButtonTextActive,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderServiceCard = ({ item }: { item: any }) => (
    <Card
      title={item.title}
      subtitle={`${item.subtitle} • ${item.price}`}
      onPress={() => console.log(`Selected service: ${item.title}`)}
      style={styles.serviceCard}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Services</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter-list" size={24} color="#1C1C1E" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search services..."
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

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryButton}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Services Grid */}
        <View style={styles.servicesContainer}>
          <View style={styles.servicesHeader}>
            <Text style={styles.servicesTitle}>
              {selectedCategory === 'All' ? 'All Services' : `${selectedCategory} Services`}
            </Text>
            <Text style={styles.servicesCount}>{filteredServices.length} services</Text>
          </View>

          <FlatList
            data={filteredServices}
            renderItem={renderServiceCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.serviceRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Icon name="search-off" size={48} color="#8E8E93" />
                <Text style={styles.emptyStateText}>No services found</Text>
                <Text style={styles.emptyStateSubtext}>Try adjusting your search or filters</Text>
              </View>
            }
          />
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  filterButton: {
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
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryButtonActive: {
    backgroundColor: '#FF6B35',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  servicesContainer: {
    paddingHorizontal: 20,
  },
  servicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  servicesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  servicesCount: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  serviceRow: {
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: (width - 60) / 2,
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ServicesScreen;
