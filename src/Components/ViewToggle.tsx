import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  isGrid: boolean;
  onGridPress: () => void;
  onListPress: () => void;
};

export default function ViewToggle({
  isGrid,
  onGridPress,
  onListPress,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onGridPress}>
        <MaterialIcons
          name="grid-view"
          size={26}
          color={isGrid ? '#A3B65A' : '#999'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onListPress}>
        <Feather name="list" size={26} color={!isGrid ? '#A3B65A' : '#999'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
    marginBottom: 10,
  },
});
