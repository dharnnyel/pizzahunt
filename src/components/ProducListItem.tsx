import {
	View,
	Text,
	Image,
	StyleSheet,
	Pressable,
} from 'react-native';
import React from 'react';
import { Product } from '@/types';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

export const defaultPizzaImage =
	'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
	product: Product;
};

const ProductListItem: React.FC<ProductListItemProps> = ({
	product,
}) => {
	return (
		<Link
			href={`/menu/${product.id }`}
			asChild
		>
			<Pressable style={styles.container}>
				<Image
					source={{
						uri: product.image || defaultPizzaImage,
					}}
					style={styles.image}
					resizeMode='contain'
				/>

				<Text style={styles.title}>{product.name}</Text>
				<Text style={styles.price}>${product.price}</Text>
			</Pressable>
		</Link>
	);
};

export default ProductListItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		overflow: 'hidden',
		maxWidth: '50%',
	},

	image: {
		width: '100%',
		aspectRatio: 1,
		alignSelf: 'center',
	},

	title: {
		color: 'black',
		fontSize: 20,
		fontWeight: '600',
		marginVertical: 10,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: 'bold',
		marginTop: 'auto',
	},
});
