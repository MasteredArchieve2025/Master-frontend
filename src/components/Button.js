import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function Button({ title, onPress }) {
  const width = 140; // horizontal length
  const height = 40;
  const slant = 30; // diagonal cut depth
  const radius = 6; // rounded bottom-right corner only

  const path = `
    M${slant} 0
    L0 ${height}
    L${width - radius} ${height}
    Q${width} ${height} ${width} ${height - radius}
    L${width} 0
    Z
  `;

  return (
    <TouchableOpacity
      style={{ width, height, justifyContent: 'center', alignItems: 'center' }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        <Path d={path} fill="#005AA1" />
      </Svg>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    zIndex: 1,
  },
});
