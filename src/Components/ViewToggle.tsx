import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Text } from 'react-native-animatable';

type Props = {
  isGrid: boolean;
  onGridPress: () => void;
  onListPress: () => void;
  totalItems: number;
};

export default function ViewToggle({
  isGrid,
  onGridPress,
  onListPress,
  totalItems,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Total Items: {totalItems}</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onGridPress}>
          <MaterialIcons
            name="grid-view"
            size={26}
            color={isGrid ? '#657C00' : '#999'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onListPress}>
          <Feather name="list" size={26} color={!isGrid ? '#657C00' : '#999'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal:'5%'
  },

  totalText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
