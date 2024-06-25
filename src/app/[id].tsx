import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';

const ProductDetails = () => {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text style={styles.header}>Details of product with id {id}</Text>
		</View>
	);
};

export default ProductDetails;

const styles = StyleSheet.create({
	header: {
		color: Colors.dark.tint,
		fontSize: 20,
	},
});
