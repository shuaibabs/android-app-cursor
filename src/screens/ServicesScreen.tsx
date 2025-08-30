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
    'Insta Help',
    'Beauty',
    'Repairs',
    'Cleaning',
    'Native',
    'Home Decor',
  ];

  const allServices = [
    // Insta Help Services
    { id: '1', title: 'Househelp', subtitle: 'Trained home cleaner & housekeeper', category: 'Insta Help', icon: '⚡', rating: 4.7, price: 'From ₹299', bookings: '20k+' },
    { id: '2', title: 'Meal Prep Assistant', subtitle: 'Professional cooking help', category: 'Insta Help', icon: '🍳', rating: 4.6, price: 'From ₹399', bookings: '15k+' },
    
    // Beauty & Wellness Services
    { id: '3', title: 'Salon at Home', subtitle: 'Professional beauty services', category: 'Beauty', icon: '💄', rating: 4.9, price: 'From ₹299', bookings: '30k+' },
    { id: '4', title: 'Spa at Home', subtitle: 'Relaxing massage & spa', category: 'Beauty', icon: '🧖‍♀️', rating: 4.8, price: 'From ₹599', bookings: '25k+' },
    { id: '5', title: 'Party Makeup', subtitle: 'Professional makeup for events', category: 'Beauty', icon: '✨', rating: 4.9, price: 'From ₹999', bookings: '10k+' },
    { id: '6', title: 'Men\'s Haircut', subtitle: 'Professional grooming at home', category: 'Beauty', icon: '✂️', rating: 4.7, price: 'From ₹199', bookings: '20k+' },
    { id: '7', title: 'Skin Consultation', subtitle: 'Expert dermatological advice', category: 'Beauty', icon: '👩‍⚕️', rating: 4.8, price: 'From ₹399', bookings: '8k+' },
    
    // Repair Services
    { id: '8', title: 'Plumber Services', subtitle: '24/7 emergency plumbing', category: 'Repairs', icon: '🔧', rating: 4.6, price: 'From ₹199', bookings: '20k+' },
    { id: '9', title: 'Electrician Services', subtitle: 'Professional electrical work', category: 'Repairs', icon: '⚡', rating: 4.7, price: 'From ₹299', bookings: '18k+' },
    { id: '10', title: 'AC Service & Repair', subtitle: 'Expert AC maintenance', category: 'Repairs', icon: '❄️', rating: 4.7, price: 'From ₹399', bookings: '25k+' },
    { id: '11', title: 'Appliance Repair', subtitle: 'Washing machine, fridge, TV', category: 'Repairs', icon: '🔌', rating: 4.5, price: 'From ₹299', bookings: '15k+' },
    { id: '12', title: 'Carpenter Services', subtitle: 'Custom woodwork & repairs', category: 'Repairs', icon: '🔨', rating: 4.6, price: 'From ₹399', bookings: '12k+' },
    
    // Cleaning Services
    { id: '13', title: 'Full Home Cleaning', subtitle: 'Complete home deep cleaning', category: 'Cleaning', icon: '🧹', rating: 4.8, price: 'From ₹999', bookings: '50k+' },
    { id: '14', title: 'Bathroom Cleaning', subtitle: 'Professional bathroom cleaning', category: 'Cleaning', icon: '🚿', rating: 4.7, price: 'From ₹399', bookings: '30k+' },
    { id: '15', title: 'Kitchen Cleaning', subtitle: 'Deep kitchen cleaning service', category: 'Cleaning', icon: '🍽️', rating: 4.7, price: 'From ₹499', bookings: '25k+' },
    { id: '16', title: 'Sofa & Carpet Cleaning', subtitle: 'Professional upholstery cleaning', category: 'Cleaning', icon: '🛋️', rating: 4.6, price: 'From ₹599', bookings: '15k+' },
    { id: '17', title: 'Pest Control', subtitle: 'Professional pest elimination', category: 'Cleaning', icon: '🐜', rating: 4.5, price: 'From ₹799', bookings: '10k+' },
    
    // Native Services
    { id: '18', title: 'Native RO Installation', subtitle: '2-year service-free RO', category: 'Native', icon: '💧', rating: 4.8, price: 'From ₹2999', bookings: '5k+' },
    { id: '19', title: 'RO Service & Repair', subtitle: 'Expert water purifier service', category: 'Native', icon: '🔧', rating: 4.6, price: 'From ₹299', bookings: '8k+' },
    
    // Home Decor Services
    { id: '20', title: 'Home Painting', subtitle: 'Interior & exterior painting', category: 'Home Decor', icon: '🎨', rating: 4.7, price: 'From ₹1999', bookings: '12k+' },
    { id: '21', title: 'Wall Panels', subtitle: 'Decorative wall installations', category: 'Home Decor', icon: '🏠', rating: 4.6, price: 'From ₹2999', bookings: '6k+' },
    { id: '22', title: 'Seepage Repair', subtitle: 'Professional water damage repair', category: 'Home Decor', icon: '🔧', rating: 4.5, price: 'From ₹999', bookings: '8k+' },
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

        {/* Services List */}
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
  serviceCard: {
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
