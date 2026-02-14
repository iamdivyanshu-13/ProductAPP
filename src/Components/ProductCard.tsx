import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function ProductCard({ item, isGrid }: any) {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('ProductDetailsScreen', {
      productId: item.id,
    });
  };
  if (isGrid) {
    return (
      <TouchableOpacity style={styles.gridCard} onPress={handlePress}>
        <View style={styles.topRow}>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={18} color="#F1904F" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>

          <MaterialIcons name="favorite" size={20} color="#A49086E5" />
        </View>

        <Image source={{ uri: item.thumbnail }} style={styles.gridImage} />

        <Text style={styles.title}  numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.price}>₱ {item.price}</Text>

        <TouchableOpacity style={styles.addBtn}>
          <MaterialIcons name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.listCard} onPress={handlePress}>
      <Image source={{ uri: item.thumbnail }} style={styles.listImage} />

      <View style={styles.listContent}>
        <Text style={styles.listTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map(i => (
            <MaterialIcons
              key={i}
              name="star"
              size={20}
              style={{ marginRight: 8 }}
              color={i <= Math.round(item.rating) ? '#F1904F' : '#AD9C92'}
            />
          ))}
        </View>

        <Text style={styles.listPrice}>₱ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gridCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    padding: 12,
    borderRadius: 14,
    elevation: 3,
  },

  gridImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginVertical: 8,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 12,
    borderRadius: 14,
    // elevation: 3,
    alignItems: 'center',
    width:'95%',
    margin:'auto'

  },

  listImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },

  listContent: {
    flex: 1,
    marginLeft: 10,
  },

  listTitle: {
    fontSize: 15,
    fontWeight: '600',
    color:'#161616',
    marginVertical:5,
  },

  starRow: {
    flexDirection: 'row',
    marginVertical: 6,
  },

  listPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#524F4F',
    // textAlign:'center'
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 12,
  },

  title: {
    fontSize: 13,
    color:'#0C0B0B',
    fontWeight:'500',
    
  },

  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,

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
