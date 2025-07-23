import React from 'react';
import { Text, View } from 'react-native';

const ExampleComponent = ({ title }) => {
  return (
    <View>
      <Text testID="example-text">{title}</Text>
    </View>
  );
};

export default ExampleComponent;