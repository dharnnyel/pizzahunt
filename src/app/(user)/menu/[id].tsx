import {
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
	ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import {
	Stack,
	router,
	useLocalSearchParams,
} from 'expo-router';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { useProduct } from '@/api/products';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetails = () => {
	const searchParam = useLocalSearchParams();

	const stringId = searchParam.id ?? '';
	const id = parseFloat(
		typeof stringId === 'string' && stringId !== ''
			? stringId
			: stringId[0]
	);

	const {
		data: product,
		error,
		isLoading,
	} = useProduct(id);

	const [selectedSize, setSelectedSize] =
		useState<PizzaSize>('S');

	const { addItem } = useCart();

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Failed to fetch product data</Text>;
	}

	const addToCart = () => {
		addItem(product, selectedSize);

		router.push('/cart');
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: product.name }} />
			<Image
				source={{ uri: product.image || defaultPizzaImage }}
				style={styles.image}
			/>

			<Text style={{ color: Colors.dark.tint }}>
				Select Size
			</Text>

			<View style={styles.sizes}>
				{sizes.map(size => (
					<Pressable
						onPress={() => {
							setSelectedSize(size);
						}}
						key={size}
						style={[
							styles.size,
							{
								backgroundColor:
									selectedSize === size
										? Colors.light.tint
										: 'transparent',
							},
						]}
					>
						<Text
							style={[
								styles.sizeText,
								{
									color:
										selectedSize === size
											? Colors.dark.tint
											: 'gray',
								},
							]}
						>
							{size}
						</Text>
					</Pressable>
				))}
			</View>

			<Text style={styles.price}>${product.price}</Text>

			<Button
				text='Add to Cart'
				onPress={addToCart}
			/>
		</View>
	);
};

export default ProductDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
	image: {
		width: '100%',
		aspectRatio: 1,
	},
	price: {
		fontSize: 18,
		color: Colors.light.tint,
		fontWeight: 'bold',
	},
	sizes: {
		flex: 1,
		flexDirection: 'row',
		marginVertical: 10,
		justifyContent: 'space-around',
	},
	size: {
		backgroundColor: 'gainsboro',
		width: 50,
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
	},
	sizeText: {
		color: Colors.dark.tint,
		fontSize: 20,
		fontWeight: '500',
	},
});
