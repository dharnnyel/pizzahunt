import { useCart } from '@/providers/CartProvider';
import {
	Image,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { defaultPizzaImage } from './ProductListItem';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import RemoteImage from './RemoteImage';

type CartListItemProps = {
	cartItem: CartItem;
};

const CartListItem: React.FC<CartListItemProps> = ({
	cartItem,
}) => {
	const { updateQuantity } = useCart();

	return (
		<View style={styles.container}>
			<RemoteImage
				path={cartItem.product.image}
				fallback={defaultPizzaImage}
				style={styles.image}
			/>
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>
					{cartItem.product.name}
				</Text>
				<View style={styles.subtitleContainer}>
					<Text style={styles.price}>
						${cartItem.product.price.toFixed(2)}
					</Text>
					<Text>Size: {cartItem.size}</Text>
				</View>
			</View>
			<View style={styles.quantitySelector}>
				<FontAwesome
					onPress={() => updateQuantity(cartItem.id, -1)}
					name='minus'
					color='gray'
					style={{ padding: 5 }}
				/>

				<Text style={styles.quantity}>
					{cartItem.quantity}
				</Text>

				<FontAwesome
					onPress={() => updateQuantity(cartItem.id, 1)}
					name='plus'
					color='gray'
					style={{ padding: 5 }}
				/>
			</View>
		</View>
	);
};

export default CartListItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 5,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		width: 75,
		aspectRatio: 1,
		alignSelf: 'center',
		marginRight: 10,
	},
	title: {
		fontWeight: '700',
		fontSize: 16,
		marginBottom: 5,
	},
	subtitleContainer: {
		flexDirection: 'row',
		gap: 25,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: 'bold',
	},
	quantitySelector: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		marginVertical: 10,
	},
	quantity: {
		fontWeight: '500',
		fontSize: 18,
	},
});
