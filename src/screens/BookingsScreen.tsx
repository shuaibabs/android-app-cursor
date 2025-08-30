import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/Card';

const BookingsScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'current' | 'past'>('current');

  const currentBookings = [
    {
      id: '1',
      service: 'Full Home Cleaning',
      provider: 'Urban Company Professional',
      date: 'Today, 2:00 PM',
      status: 'confirmed',
      price: '₹999',
      address: '123 Main St, Apt 4B, Mumbai',
      rating: 4.8,
    },
    {
      id: '2',
      service: 'AC Service & Repair',
      provider: 'Urban Company Professional',
      date: 'Tomorrow, 10:00 AM',
      status: 'pending',
      price: '₹399',
      address: '123 Main St, Apt 4B, Mumbai',
    },
    {
      id: '3',
      service: 'Salon at Home',
      provider: 'Urban Company Professional',
      date: 'Dec 28, 2024, 3:30 PM',
      status: 'confirmed',
      price: '₹599',
      address: '123 Main St, Apt 4B, Mumbai',
    },
  ];

  const pastBookings = [
    {
      id: '4',
      service: 'Plumber Services',
      provider: 'Urban Company Professional',
      date: 'Yesterday, 3:30 PM',
      status: 'completed',
      price: '₹299',
      address: '123 Main St, Apt 4B, Mumbai',
      rating: 5,
    },
    {
      id: '5',
      service: 'Bathroom Cleaning',
      provider: 'Urban Company Professional',
      date: 'Dec 15, 2024',
      status: 'completed',
      price: '₹399',
      address: '123 Main St, Apt 4B, Mumbai',
      rating: 4,
    },
    {
      id: '6',
      service: 'Men\'s Haircut',
      provider: 'Urban Company Professional',
      date: 'Dec 10, 2024',
      status: 'cancelled',
      price: '₹199',
      address: '123 Main St, Apt 4B, Mumbai',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#34C759';
      case 'pending':
        return '#FF9500';
      case 'completed':
        return '#007AFF';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const renderBookingCard = ({ item }: { item: any }) => (
    <Card
      variant="booking"
      title={item.service}
      subtitle={`${item.provider} • ${item.date}`}
      onPress={() => console.log(`View booking: ${item.id}`)}
    >
      <View style={styles.bookingDetails}>
        <View style={styles.bookingRow}>
          <View style={styles.bookingInfo}>
            <Icon name="location-on" size={16} color="#8E8E93" />
            <Text style={styles.bookingAddress}>{item.address}</Text>
          </View>
          <Text style={styles.bookingPrice}>{item.price}</Text>
        </View>
        
        <View style={styles.bookingRow}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
          
          {item.rating && (
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          )}
        </View>

        {selectedTab === 'current' && item.status === 'confirmed' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="phone" size={16} color="#FF6B35" />
              <Text style={styles.actionButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="message" size={16} color="#FF6B35" />
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="cancel" size={16} color="#FF3B30" />
              <Text style={[styles.actionButtonText, { color: '#FF3B30' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedTab === 'past' && item.status === 'completed' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="star" size={16} color="#FF6B35" />
              <Text style={styles.actionButtonText}>Rate Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="refresh" size={16} color="#FF6B35" />
              <Text style={styles.actionButtonText}>Book Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Bookings</Text>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'current' && styles.tabActive]}
            onPress={() => setSelectedTab('current')}
          >
            <Text style={[styles.tabText, selectedTab === 'current' && styles.tabTextActive]}>
              Current ({currentBookings.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'past' && styles.tabActive]}
            onPress={() => setSelectedTab('past')}
          >
            <Text style={[styles.tabText, selectedTab === 'past' && styles.tabTextActive]}>
              Past ({pastBookings.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bookings List */}
        <View style={styles.bookingsContainer}>
          <FlatList
            data={selectedTab === 'current' ? currentBookings : pastBookings}
            renderItem={renderBookingCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Icon name="event-busy" size={48} color="#8E8E93" />
                <Text style={styles.emptyStateText}>
                  No {selectedTab} bookings
                </Text>
                <Text style={styles.emptyStateSubtext}>
                  {selectedTab === 'current' 
                    ? 'You don\'t have any upcoming bookings' 
                    : 'You don\'t have any past bookings'
                  }
                </Text>
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#FF6B35',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
  },
  tabTextActive: {
    color: '#FF6B35',
  },
  bookingsContainer: {
    paddingHorizontal: 20,
  },
  bookingDetails: {
    marginTop: 12,
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bookingAddress: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
    flex: 1,
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B35',
    marginLeft: 4,
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
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default BookingsScreen;
