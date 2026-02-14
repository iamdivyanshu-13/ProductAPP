import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import Swiper from 'react-native-swiper';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import { getProductDetails } from '../Services/Products.service';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen({ route, navigation }: any) {
  const { productId } = route.params || {};
  const productIdNum =
    typeof productId === 'string' ? parseInt(productId, 10) : productId;

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProductDetails();
  }, [productIdNum]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!productIdNum || isNaN(productIdNum)) {
        throw new Error(`Invalid product ID: ${productId}`);
      }

      const response = await getProductDetails(productIdNum);

      if (!response.data || !response.data[0]) {
        throw new Error(`Product with ID ${productIdNum} not found`);
      }

      setProduct(response.data[0]);
    } catch (error: any) {
      console.error('Error fetching product details:', error);
      setError(error.message || 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={26} />
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#A3B65A" />
          <Text style={styles.loadingText}>Loading product details...</Text>
        </View>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={26} />
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <MaterialIcons name="error-outline" size={64} color="#ff6b6b" />
          <Text style={styles.errorTitle}>Product Not Found</Text>
          <Text style={styles.errorText}>
            {error || `Product with ID ${productIdNum} could not be found.`}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchProductDetails}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={26} />
      </TouchableOpacity>
      <View style={styles.sliderContainer}>
        <Swiper
          key={product.images?.length}
          showsPagination={true}
          loop={false}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          paginationStyle={{ bottom: 10 }}
        >
          {product.images.map((img: string, index: number) => (
            <View key={index} style={styles.slide}>
              <Image source={{ uri: img }} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 20 }}
  >
        <View style={styles.row}>
          <View style={{ width: '70%' }}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.category}>{product.category}</Text>
          </View>

          <View style={{ width: '30%' }}>
            <Text style={styles.priceLabel}>Price</Text>

            <Text style={styles.price}>₱ {product.price}</Text>
          </View>
        </View>
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtndec} onPress={decreaseQty}>
            <Feather name="minus" size={20} />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{quantity}</Text>

          <TouchableOpacity style={styles.qtyBtninc} onPress={increaseQty}>
            <Feather name="plus" size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.descTitle}>Description</Text>

        <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
        <View style={styles.buyRow}>
          <View style={styles.cartIcon}>
            <MaterialIcons
              name="shopping-bag"
              size={30}
              color="#A3B65A"
            />
          </View>

          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BAC3C3',
  },

  backBtn: {
    marginTop: 40,
    marginLeft: 15,
    fontWeight:'bold'
  },

  sliderContainer: {
    height: 350,
  },

  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: width -5,
    height: 300,
    resizeMode: 'contain',
  },

  dot: {
    backgroundColor: '#ffffff',
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  activeDot: {
    backgroundColor: '#AABB5D',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor:'#ffffff',
    borderWidth:0.5
  },

  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#161616',
  },

  category: {
    color: '#7A7878',
    marginTop: 4,
    fontSize: 16,
  },

  priceLabel: {
    color: '#7A7878',
    fontSize: 16,
    textAlign: 'right',
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'flex-end',
  },

  qtyBtndec: {
    borderWidth: 2,
    borderRadius: 6,
    padding: 5,
  },
  qtyBtninc: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#5E5A5A',
    padding: 5,
    backgroundColor: '#5E5A5A',
  },

  qtyText: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },

  descTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
    color: '#1A1A1A',
  },

  description: {
    color: '#514C4C',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },

  cartIcon: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    width: '15%',
  },

  buyBtn: {
    flex: 1,
    backgroundColor: '#F5C900',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '85%',
  },

  buyText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#161616',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#A3B65A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
