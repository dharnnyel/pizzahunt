import {
	Image,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';
import { defaultPizzaImage } from './ProductListItem';
import Colors from '@/constants/Colors';
import { Tables } from 'types/database';
import RemoteImage from './RemoteImage';

type OrderItemListItemProps = {
	item: {
		products: Tables<'products'> | null;
	} & Tables<'order_items'>;
};

const OrderItemListItem: React.FC<
	OrderItemListItemProps
> = ({ item }) => {
	return (
		<View style={styles.container}>
			<View style={styles.leftSection}>
				<RemoteImage
					path={item.products?.image}
					fallback={defaultPizzaImage}
					style={styles.image}
					resizeMode='contain'
				/>
				<View>
					<Text style={styles.name}>
						{item.products?.name}
					</Text>
					<View style={styles.priceSize}>
						<Text style={styles.price}>
							${item.products?.price?.toFixed(2)}
						</Text>
						<Text style={styles.size}>
							Size: {item.size}
						</Text>
					</View>
				</View>
			</View>
			<Text style={styles.quantity}>{item.quantity}</Text>
		</View>
	);
};

export default OrderItemListItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 15,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	leftSection: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
	},
	image: {
		width: '30%',
		aspectRatio: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
	},

	priceSize: {
		flexDirection: 'row',
		gap: 10,
		marginTop: 5,
	},

	price: {
		color: Colors.light.tint,
		fontWeight: 'bold',
	},
	size: {
		fontWeight: '600',
	},
	quantity: {
		marginRight: 12,
		fontSize: 16,
		fontWeight: '600',
	},
});
