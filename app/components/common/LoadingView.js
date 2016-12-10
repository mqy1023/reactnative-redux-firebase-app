import React from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';

const LoadingView = () => (
  <View style={styles.loading}>
    <ActivityIndicator
      size="large"
      color="#FF7F00"
    />
    <Text style={styles.loadingText}>努力加载中...</Text>
  </View>
);

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center'
  }
});

export { LoadingView };
