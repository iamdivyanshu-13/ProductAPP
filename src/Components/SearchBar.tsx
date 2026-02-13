import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {

  return (

    <View style={styles.container}>

      <TextInput
        placeholder="Search"
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholderTextColor={'#333'}
      />

      <MaterialIcons
        name="search"
        size={22}
        color="#555"
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '95%',
    margin:'auto'
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

});
