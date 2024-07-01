import {
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import {
	Link,
	Stack,
	router,
	useLocalSearchParams,
} from 'expo-router';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { FontAwesome } from '@expo/vector-icons';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetails = () => {
	const { id } = useLocalSearchParams();
	const [selectedSize, setSelectedSize] =
		useState<PizzaSize>('S');

	const { addItem } = useCart();

	const product = products.find(
		product => product.id.toString() === id
	);

	if (!product) {
		return <Text>Product not found</Text>;
	}

	const addToCart = () => {
		addItem(product, selectedSize);

		router.push('/cart');
	};

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: 'Menu',
					headerRight: () => (
						<Link
							href={`/(admin)/menu/create?id=${id}`}
							asChild
						>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name='pencil'
										size={20}
										color={Colors.light.tint}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1,
										}}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>

			<Stack.Screen options={{ title: product.name }} />
			<Image
				source={{ uri: product.image || defaultPizzaImage }}
				style={styles.image}
			/>

			{/* TODO: FIGURE HOW TO DISPLAY AVAILABLE SIZES */}
			{/* <Text style={{ color: Colors.dark.tint }}>
				Available Sizes
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
			</View> */}

			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>

			{/* <Button
				text='Add to Cart'
				onPress={addToCart}
			/> */}
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
	title: {
		color: Colors.dark.tint,
		fontSize: 22,
		fontWeight: '800',
	},
	// sizes: {
	// 	flex: 1,
	// 	flexDirection: 'row',
	// 	marginVertical: 10,
	// 	justifyContent: 'space-around',
	// },
	// size: {
	// 	backgroundColor: 'gainsboro',
	// 	width: 50,
	// 	aspectRatio: 1,
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	borderRadius: 25,
	// },
	// sizeText: {
	// 	color: Colors.dark.tint,
	// 	fontSize: 20,
	// 	fontWeight: '500',
	// },
});
