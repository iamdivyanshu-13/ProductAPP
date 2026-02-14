import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { getProducts } from '../Services/Products.service';
import ProductCard from '../Components/ProductCard';
import SearchBar from '../Components/SearchBar';
import ViewToggle from '../Components/ViewToggle';

export default function DashboardScreen() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isGrid, setIsGrid] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = products.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredProducts(filtered);
  };

  const toggleGridView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setIsGrid(true);
  };

  const toggleListView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setIsGrid(false);
  };

  const fetchDashboardData = async () => {
    setLoading(true);

    try {
      const response = await getProducts();
      setProducts(response?.data?.products);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.header}>Explore</Text>
        <SearchBar value={search} onChange={handleSearch} />
        <ViewToggle
          isGrid={isGrid}
          onGridPress={toggleGridView}
          onListPress={toggleListView}
          totalItems={filteredProducts.length}
        />

        <FlatList
          key={isGrid ? 'grid' : 'list'}
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard item={item} isGrid={isGrid} />}
          keyExtractor={item => item.id.toString()}
          numColumns={isGrid ? 2 : 1}
          ListEmptyComponent={
            !loading && search.length > 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No product found for "{search}"
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#BBC3C3',
  },

  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333131',
  },

  list: {
    paddingBottom: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  emptyText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});
