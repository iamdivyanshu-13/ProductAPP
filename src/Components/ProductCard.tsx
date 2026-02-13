import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function ProductCard({ item }: any) {
     const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('ProductDetailsScreen', {
      productId: item.id,
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
    >
      <View style={styles.topRow}>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={14} color="#F1904F" />

          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>

        <Feather name="heart" size={16} color="#999" />
      </View>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.price}>₱ {item.price}</Text>
      <TouchableOpacity style={styles.addBtn}>
        <MaterialIcons name="add" size={16} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    padding: 12,
    borderRadius: 14,
    elevation: 3,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#333',
  },

  image: {
    width: '100%',
    height: 110,
    resizeMode: 'contain',
    marginVertical: 8,
  },

  title: {
    fontSize: 13,
    color: '#0C0B0B',
  },

  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
    color:'#554E4E'
  },

  addBtn: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#F5C900',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
