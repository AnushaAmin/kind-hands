import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Picker, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { Categories } from '../common/Constants';

const CreateServiceScreen = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const requirementCheck = (name, category) => {
    if (name === '' || category === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (requirementCheck(name, category)) {
      Alert.alert('Success', 'Service saved successfully!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name  e.g(My Service 1)"
        value={name}
        onChangeText={setName}
        maxLength={20}
      />
      <Picker
        style={styles.input}
        selectedValue={category}
        onValueChange={setCategory}
      >
        {Categories.map((dog) => (
          <Picker.Item key={dog} label={dog} value={dog} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        maxLength={300}
        multiline
      />
      <Button mode="contained" onPress={handleSave}>Save</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});

export default CreateServiceScreen;
